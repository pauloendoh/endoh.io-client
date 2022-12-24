import { Autocomplete } from "@mui/lab"
import { Popper } from "@mui/material"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { queryKeys } from "hooks/react-query/queryKeys"
import useNotesSearchQuery from "hooks/react-query/search/useNotesSearchQuery"
import useDebounce from "hooks/utils/useDebounce"
import React, { useEffect, useMemo, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { useHotkeys } from "react-hotkeys-hook"
import { useQueryClient } from "react-query"
import { useHistory } from "react-router-dom"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import { SearchResultsDto } from "types/domain/utils/SearchResultsDto"
import { urls } from "utils/urls"
import MyTextField from "../../../../../_UI/MyInputs/MyTextField"
import NotesSearchBarOption from "./NotesSearchBarOption/NotesSearchBarOption"
import { FlashnotesSearchType } from "./types/FlashnotesSearchType"

interface Props {
  type: FlashnotesSearchType
}
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

const NotesSearchBar = (props: Props) => {
  const MIN_LENGTH = 3

  const history = useHistory()

  const { handleSubmit, control, getValues, watch, setValue } = useForm<
    ISearchForm
  >({
    defaultValues: {
      searchQuery: "",
    },
  })

  const { data: searchResults, refetch, isFetching } = useNotesSearchQuery({
    query: watch("searchQuery"),
    minLength: MIN_LENGTH,
    type: props.type,
  })

  const submit = (values: ISearchForm) => {}

  const ctrlSubmit = (values: ISearchForm) => {
    if (values.searchQuery?.length) {
      window.open(urls.pages.search(values.searchQuery))
    }
  }

  const qc = useQueryClient()

  useEffect(() => {
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

  const sortedOptions = useMemo(() => {
    if (searchResults?.notes && searchResults?.docs)
      return [...searchResults.docs, ...searchResults.notes.slice(0, 25)]

    return []
  }, [searchResults?.notes, searchResults?.docs])

  const [onOpenDialog] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])

  const inputRef = useRef<HTMLInputElement | null>(null)
  useHotkeys("f", () => {
    setTimeout(() => {
      inputRef?.current.focus()
    }, 100)
  })

  const defaultSubmit = useDefaultSubmitQuestion()

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
          renderOption={(liProps, docOrNote) => (
            <NotesSearchBarOption
              liProps={liProps}
              key={docOrNote.id}
              docOrNote={docOrNote}
              handleClick={() => {
                if ("title" in docOrNote)
                  return history.push(urls.pages.questionsDoc(docOrNote.id))

                return onOpenDialog({
                  initialValue: docOrNote,
                  onSubmit: defaultSubmit,
                })
              }}
              onClickLink={(e) => {
                // @ts-expect-error
                liProps.onClick(e)
              }}
            />
          )}
          getOptionLabel={() => watch("searchQuery")}
          clearOnBlur={false}
          renderInput={(params) => (
            <Controller
              control={control}
              name="searchQuery"
              render={({ field }) => (
                <MyTextField
                  inputRef={inputRef}
                  {...params}
                  {...field}
                  label="Search questions"
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
                  onFocus={() => refetch()}
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
