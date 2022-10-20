import { Popper } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { queryKeys } from "hooks/react-query/queryKeys"
import useNotesSearchQuery from "hooks/react-query/search/useNotesSearchQuery"
import useDebounce from "hooks/utils/useDebounce"
import React, { useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useHistory } from "react-router-dom"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { NoteDto } from "types/domain/define/NoteDto"
import { SearchResultsDto } from "types/domain/utils/SearchResultsDto"
import myAxios from "utils/consts/myAxios"
import apiUrls from "utils/url/urls/apiUrls"
import { urls } from "utils/urls"
import pageUrls from "../../../../../../utils/url/urls/pageUrls"
import MyTextField from "../../../../../_UI/MyInputs/MyTextField"
import NotesSearchBarOption from "./NotesSearchBarOption/NotesSearchBarOption"

interface ISearchForm {
  searchQuery?: string
}

const MyPopper = function (props: React.ComponentProps<typeof Popper>) {
  return (
    <Popper
      {...props}
      style={{ width: "clamp(350px, 800px, 90vw)" }}
      placement="bottom-start"
    />
  )
}

const NotesSearchBar = () => {
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

  const { data: searchResults, refetch, isFetching } = useNotesSearchQuery(
    watch("searchQuery"),
    MIN_LENGTH
  )

  const submit = (values: ISearchForm) => {}

  const ctrlSubmit = (values: ISearchForm) => {
    if (values.searchQuery?.length) {
      window.open(pageUrls.search(values.searchQuery))
    }
  }

  const qc = useQueryClient()

  useEffect(() => {
    setLoading(false)
    setValue("searchQuery", "")
    qc.cancelQueries(queryKeys.notesSearchResults)
    qc.setQueryData<SearchResultsDto>(queryKeys.notesSearchResults, null)
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
    if (!!searchResults) setLoading(false)
  }, [searchResults])

  const sortedOptions = useMemo(() => {
    if (searchResults?.notes && searchResults?.docs)
      return [
        ...searchResults.docs,
        ...searchResults.notes
          .sort((a, b) => {
            if (b.question.trim().length > 0 && a.question.trim().length === 0)
              return 1
            return -1
          })
          .slice(0, 25),
      ]

    return []
  }, [searchResults?.notes, searchResults?.docs])

  const pushOrReplaceNote = useDocsStore((s) => s.pushOrReplaceNote)
  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)

  const [onOpenDialog, closeDialog] = useNoteDialogStore((s) => [
    s.onOpen,
    s.onClose,
  ])

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Autocomplete
          loading={isFetching}
          // if no text, show nothing (don't show 'no resources :(')

          noOptionsText={
            watch("searchQuery").length >= MIN_LENGTH &&
            debouncedSearchQuery === watch("searchQuery")
              ? "No questions or docs found :("
              : "Type at least 3 characters"
          }
          options={
            watch("searchQuery").length >= MIN_LENGTH ? sortedOptions : []
          }
          PopperComponent={MyPopper}
          filterOptions={(notes) => notes} // what this do?
          renderOption={(docOrNote) => (
            <NotesSearchBarOption
              key={docOrNote.id}
              docOrNote={docOrNote}
              handleClick={() => {
                if ("title" in docOrNote)
                  return history.push(urls.pages.defineDoc(docOrNote.id))

                return onOpenDialog({
                  initialValue: docOrNote,
                  onSubmit: (value) => {
                    myAxios
                      .post<NoteDto>(apiUrls.define.note, value)
                      .then((res) => {
                        pushOrReplaceNote(res.data)

                        setSuccessMessage("Question saved!")
                        closeDialog()
                      })
                  },
                })
              }}
            />
          )}
          // don't change input text when selecting a resource
          getOptionLabel={() => watch("searchQuery")}
          // getOptionLabel={(resource) => "resource.title"}

          clearOnBlur={false}
          // onChange={(e, newSelectedResource) => {
          //   if (typeof newSelectedResource === "string") {
          //     // setValue("searchQuery", resource);
          //     return
          //   }
          //   // setValue("searchQuery", resource?.title || "");
          //   editResource(newSelectedResource)
          // }}
          renderInput={(params) => (
            <Controller
              control={control}
              name="searchQuery"
              render={({ field }) => (
                <MyTextField
                  {...params}
                  {...field}
                  label="Search questions"
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
    </>
  )
}

export default NotesSearchBar
