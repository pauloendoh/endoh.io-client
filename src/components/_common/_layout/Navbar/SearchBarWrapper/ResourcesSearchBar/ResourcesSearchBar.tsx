import { Autocomplete, Popper } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "hooks/react-query/queryKeys"
import useResourcesSearchQuery from "hooks/react-query/search/useResourcesSearchQuery"
import useDebounce from "hooks/utils/useDebounce"
import React, { useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import { SearchResultsDto } from "types/domain/utils/SearchResultsDto"
import { urls } from "utils/urls"
import MyTextField from "../../../../../_UI/MyInputs/MyTextField"
import ResourcesSearchBarOption from "./ResourcesSearchBarOption/ResourcesSearchBarOption"

interface ISearchForm {
  searchQuery?: string
}

const MyPopper = function (props: React.ComponentProps<typeof Popper>) {
  return <Popper {...props} style={{ width: 700 }} placement="bottom-start" />
}

const ResourcesSearchBar = () => {
  const { setInitialValue: setEditingResource } = useResourceDialogStore()

  const MIN_LENGTH = 3

  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const { handleSubmit, control, getValues, watch, setValue } =
    useForm<ISearchForm>({
      defaultValues: {
        searchQuery: "",
      },
    })

  const { data: searchResults, refetch } = useResourcesSearchQuery(
    watch("searchQuery") || "",
    MIN_LENGTH
  )

  const submit = (values: ISearchForm) => {
    if (values.searchQuery?.length)
      history.push(urls.pages.search(values.searchQuery))
  }

  const ctrlSubmit = (values: ISearchForm) => {
    if (values.searchQuery?.length) {
      window.open(urls.pages.search(values.searchQuery))
    }
  }

  const qc = useQueryClient()

  useEffect(() => {
    setLoading(false)
    setValue("searchQuery", "")
    qc.cancelQueries([queryKeys.resourceSearchResults])
    qc.setQueryData<SearchResultsDto>(
      [queryKeys.resourceSearchResults],
      undefined
    )
  }, [history.location.search])

  const debouncedSearchQuery = useDebounce(watch("searchQuery"), 250)

  useEffect(() => {
    refetch()
  }, [debouncedSearchQuery])

  useEffect(() => {
    if (searchResults) setLoading(false)
  }, [searchResults])

  const sortedResources = useMemo(() => {
    if (searchResults?.resources)
      return searchResults.resources
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 25)
    return []
  }, [searchResults?.resources])

  const freeSolo = useMemo(() => {
    const searchQuery = watch("searchQuery")
    return Boolean(searchQuery && searchQuery.length < MIN_LENGTH)
  }, [watch("searchQuery")])

  const noOptionsText = useMemo(() => {
    const searchQuery = watch("searchQuery")
    return searchQuery && searchQuery.length >= MIN_LENGTH
      ? "No resources found :("
      : "Type at least 3 characters"
  }, [watch("searchQuery"), debouncedSearchQuery])

  const options = useMemo(() => {
    const searchQuery = watch("searchQuery")
    return searchQuery && searchQuery.length >= MIN_LENGTH
      ? sortedResources
      : []
  }, [sortedResources, watch("searchQuery")])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Autocomplete
        loading={loading}
        // if no text, show nothing (don't show 'no resources :(')
        freeSolo={freeSolo}
        noOptionsText={noOptionsText}
        options={options}
        PopperComponent={MyPopper}
        filterOptions={(resources) => resources}
        renderOption={(htmlProps, resource) => (
          <ResourcesSearchBarOption
            key={resource.id}
            resource={resource}
            handleClick={() => setEditingResource(resource)}
            htmlProps={htmlProps}
          />
        )}
        // don't change input text when selecting a resource
        getOptionLabel={() => watch("searchQuery") || ""}
        // getOptionLabel={(resource) => "resource.title"}

        clearOnBlur={false}
        onChange={(e, newSelectedResource) => {
          if (typeof newSelectedResource === "string") {
            // setValue("searchQuery", resource);
            return
          }
          // setValue("searchQuery", resource?.title || "");
          setEditingResource(newSelectedResource)
        }}
        renderInput={(params) => (
          <Controller
            control={control}
            name="searchQuery"
            render={({ field }) => (
              <MyTextField
                {...params}
                {...field}
                label="Search your resources"
                size="small"
                style={{
                  width: 240,
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

export default ResourcesSearchBar
