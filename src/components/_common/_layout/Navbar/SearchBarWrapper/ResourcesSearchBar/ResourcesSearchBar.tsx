import { Autocomplete } from "@mui/lab"
import { Popper } from "@mui/material"
import { queryKeys } from "hooks/react-query/queryKeys"
import useResourcesSearchQuery from "hooks/react-query/search/useResourcesSearchQuery"
import useDebounce from "hooks/utils/useDebounce"
import React, { useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { Dispatch } from "redux"
import { editResource } from "store/relearn/relearnActions"
import { ApplicationState } from "store/store"
import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { SearchResultsDto } from "types/domain/utils/SearchResultsDto"
import pageUrls from "../../../../../../utils/url/urls/pageUrls"
import MyTextField from "../../../../../_UI/MyInputs/MyTextField"
import ResourcesSearchBarOption from "./ResourcesSearchBarOption/ResourcesSearchBarOption"

interface ISearchForm {
  searchQuery?: string
}

const MyPopper = function (props: React.ComponentProps<typeof Popper>) {
  return <Popper {...props} style={{ width: 700 }} placement="bottom-start" />
}

const ResourcesSearchBar = ({ editResource }: Props) => {
  const MIN_LENGTH = 3

  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  const { handleSubmit, control, getValues, watch, setValue } = useForm<
    ISearchForm
  >({
    defaultValues: {
      searchQuery: "",
    },
  })

  const { data: searchResults, refetch } = useResourcesSearchQuery(
    watch("searchQuery"),
    MIN_LENGTH
  )

  const submit = (values: ISearchForm) => {
    if (values.searchQuery?.length)
      history.push(pageUrls.search(values.searchQuery))
  }

  const ctrlSubmit = (values: ISearchForm) => {
    if (values.searchQuery?.length) {
      window.open(pageUrls.search(values.searchQuery))
    }
  }

  const qc = useQueryClient()

  useEffect(() => {
    setLoading(false)
    setValue("searchQuery", "")
    qc.cancelQueries(queryKeys.resourceSearchResults)
    qc.setQueryData<SearchResultsDto>(queryKeys.resourceSearchResults, null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search])

  const debouncedSearchQuery = useDebounce(watch("searchQuery"), 250)

  useEffect(
    () => {
      refetch()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchQuery]
  )

  useEffect(() => {
    if (searchResults) setLoading(false)
  }, [searchResults])

  const sortedResources = useMemo(() => {
    if (searchResults?.resources)
      return searchResults.resources
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 25)
    return []
  }, [searchResults?.resources])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Autocomplete
        loading={loading}
        // if no text, show nothing (don't show 'no resources :(')
        freeSolo={watch("searchQuery").length < MIN_LENGTH}
        noOptionsText={
          watch("searchQuery").length >= MIN_LENGTH &&
          debouncedSearchQuery === watch("searchQuery")
            ? "No resources found :("
            : "Type at least 3 characters"
        }
        options={
          watch("searchQuery").length >= MIN_LENGTH ? sortedResources : []
        }
        PopperComponent={MyPopper}
        filterOptions={(resources) => resources}
        renderOption={(htmlProps, resource) => (
          <ResourcesSearchBarOption
            key={resource.id}
            resource={resource}
            handleClick={() => editResource(resource)}
            htmlProps={htmlProps}
          />
        )}
        // don't change input text when selecting a resource
        getOptionLabel={() => watch("searchQuery")}
        // getOptionLabel={(resource) => "resource.title"}

        clearOnBlur={false}
        onChange={(e, newSelectedResource) => {
          if (typeof newSelectedResource === "string") {
            // setValue("searchQuery", resource);
            return
          }
          // setValue("searchQuery", resource?.title || "");
          editResource(newSelectedResource)
        }}
        renderInput={(params) => (
          <Controller
            control={control}
            name="searchQuery"
            render={({ field }) => (
              <MyTextField
                {...params}
                {...field}
                label="Search resources"
                size="small"
                style={{
                  width: 160,
                }}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    borderRadius: "4px 0px 0px 4px",
                  },
                }}
                onCtrlEnter={(e) => {
                  ctrlSubmit(getValues())
                }}
              />
            )}
          />
        )}
      />
    </form>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) => dispatch(editResource(resource)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesSearchBar)
