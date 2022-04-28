import { Popper } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { queryKeys } from "hooks/react-query/queryKeys";
import useFetchSearchResults from "hooks/react-query/search/useFetchSearchResults";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { editResource } from "store/relearn/relearnActions";
import { ApplicationState } from "store/store";
import { ResourceDto } from "types/domain/relearn/ResourceDto";
import { SearchResultsDto } from "types/domain/utils/SearchResultsDto";
import pageUrls from "../../../../../utils/url/urls/pageUrls";
import MyTextField from "../../../../_UI/MyInputs/MyTextField";
import SearchBarOption from "./SearchBarOption/SearchBarOption";

interface ISearchForm {
  searchQuery?: string;
}

const MyPopper = function (props: React.ComponentProps<typeof Popper>) {
  return <Popper {...props} style={{ width: 700 }} placement="bottom-start" />;
};

const SearchBar = ({ editResource }: Props) => {
  const MIN_LENGTH = 3;

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null);

  const { handleSubmit, control, getValues, watch, setValue } =
    useForm<ISearchForm>({
      defaultValues: {
        searchQuery: "",
      },
    });

  const { data: searchResults, refetch } = useFetchSearchResults(
    watch("searchQuery"),
    MIN_LENGTH
  );

  const submit = (values: ISearchForm) => {
    if (values.searchQuery?.length)
      history.push(pageUrls.search(values.searchQuery));
  };

  const ctrlSubmit = (values: ISearchForm) => {
    if (values.searchQuery?.length) {
      window.open(pageUrls.search(values.searchQuery));
    }
  };

  const qc = useQueryClient();

  useEffect(() => {
    setLoading(false);
    setValue("searchQuery", "");
    qc.cancelQueries(queryKeys.searchResults);
    qc.setQueryData<SearchResultsDto>(queryKeys.searchResults, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search]);

  useEffect(
    () => {
      if (getValues("searchQuery").length >= MIN_LENGTH) setLoading(true);
      else setLoading(false);
      clearTimeout(throttle);
      setThrottle(setTimeout(refetch, 500));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch("searchQuery")]
  );

  useEffect(() => {
    if (searchResults) setLoading(false);
  }, [searchResults]);

  const sortedResources = useMemo(() => {
    if (searchResults?.resources)
      return searchResults.resources
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 25);
    return [];
  }, [searchResults?.resources]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Autocomplete
        loading={loading}
        // if no text, show nothing (don't show 'no resources :(')
        freeSolo={watch("searchQuery").length < MIN_LENGTH}
        noOptionsText={"No resources :("}
        options={sortedResources}
        PopperComponent={MyPopper}
        filterOptions={(resources) => resources}
        renderOption={(resource) => (
          <SearchBarOption
            key={resource.id}
            resource={resource}
            handleClick={() => editResource(resource)}
          />
        )}
        // don't change input text when selecting a resource
        getOptionLabel={() => watch("searchQuery")}
        // getOptionLabel={(resource) => "resource.title"}

        clearOnBlur={false}
        onChange={(e, newSelectedResource) => {
          if (typeof newSelectedResource === "string") {
            // setValue("searchQuery", resource);
            return;
          }
          // setValue("searchQuery", resource?.title || "");
          editResource(newSelectedResource);
        }}
        renderInput={(params) => (
          <Controller
            control={control}
            name="searchQuery"
            render={({ field }) => (
              <MyTextField
                {...params}
                {...field}
                label="Search endoh.io"
                size="small"
                style={{ width: 184 }}
                onCtrlEnter={(e) => {
                  ctrlSubmit(getValues());
                }}
              />
            )}
          />
        )}
      />
    </form>
  );
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) => dispatch(editResource(resource)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
