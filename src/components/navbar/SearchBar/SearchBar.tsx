import { Popper } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter";
import useFetchSearchResults from "hooks/react-query/search/useFetchSearchResults";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { editResource } from "store/relearn/relearnActions";
import { ApplicationState } from "store/store";
import { ResourceDto } from "types/domain/relearn/ResourceDto";
import pageUrls from "../../../utils/consts/pageUrls";
import MyTextField from "../../shared/MyInputs/MyTextField";

interface ISearchForm {
  searchQuery?: string;
}

const MyPopper = function (props: React.ComponentProps<typeof Popper>) {
  return <Popper {...props} style={{ width: 600 }} placement="bottom-start" />;
};

const SearchBar = ({ editResource }: Props) => {
  const history = useHistory();

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null);

  const { handleSubmit, control, getValues, watch, setValue } =
    useForm<ISearchForm>({
      defaultValues: {
        searchQuery: "",
      },
    });

  const { data: searchResults, refetch } = useFetchSearchResults(
    watch("searchQuery")
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

  useEffect(
    () => {
      clearTimeout(throttle);
      setThrottle(
        setTimeout(() => {
          refetch();
        }, 500)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch("searchQuery")]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Autocomplete
        freeSolo
        options={searchResults?.resources || []}
        PopperComponent={MyPopper}
        renderOption={(resource) => <FlexVCenter>{resource.title}</FlexVCenter>}
        getOptionLabel={(resource) => resource.title}
        onChange={(e, resource) => {
          console.log(resource);
          if (typeof resource === "string") setValue("searchQuery", resource);
          else {
            setValue("searchQuery", resource?.title || "");
            editResource(resource);
          }
        }}
        renderInput={(params) => (
          <Controller
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
            control={control}
            name="searchQuery"
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
