import { Autocomplete, Popper } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { queryKeys } from "hooks/react-query/queryKeys"
import useQuestionsSearchQuery from "hooks/react-query/search/useQuestionsSearchQuery"
import useDebounce from "hooks/utils/useDebounce"
import React, { useEffect, useMemo, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { useHotkeys } from "react-hotkeys-hook"
import { useHistory } from "react-router-dom"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import { SearchResultsDto } from "types/domain/utils/SearchResultsDto"
import { urls } from "utils/urls"
import MyTextField from "../../../../../_UI/MyInputs/MyTextField"
import QuestionsSearchBarOption from "./NotesSearchBarOption/QuestionsSearchBarOption"
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

const QuestionsSearchBar = (props: Props) => {
  const MIN_LENGTH = 3

  const history = useHistory()

  const { handleSubmit, control, getValues, watch, setValue } =
    useForm<ISearchForm>({
      defaultValues: {
        searchQuery: "",
      },
    })

  const searchQuery = useMemo(
    () => watch("searchQuery") || "",
    [watch("searchQuery")]
  )

  const {
    data: searchResults,
    refetch,
    isFetching,
  } = useQuestionsSearchQuery({
    query: searchQuery,
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
    qc.cancelQueries([queryKeys.questionsSearchResults])
    qc.setQueryData<SearchResultsDto>(
      [queryKeys.questionsSearchResults],
      undefined
    )
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

  const [onOpenDialog] = useQuestionDialogStore((s) => [
    s.openDialog,
    s.onClose,
  ])

  const inputRef = useRef<HTMLInputElement | null>(null)
  useHotkeys("f", () => {
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 100)
  })

  const defaultSubmit = useDefaultSubmitQuestion()

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Autocomplete
        loading={isFetching}
        // if no text, show nothing (don't show 'no resources :(')

        noOptionsText={
          searchQuery.length >= MIN_LENGTH &&
          debouncedSearchQuery === watch("searchQuery")
            ? "No questions or docs found :("
            : "Type at least 3 characters"
        }
        options={searchQuery.length >= MIN_LENGTH ? sortedOptions : []}
        PopperComponent={MyPopper}
        filterOptions={(notes) => notes} // what this do?
        renderOption={(liProps, docOrQuestion) => (
          <QuestionsSearchBarOption
            liProps={liProps}
            key={docOrQuestion.id}
            docOrQuestion={docOrQuestion}
            onClickQuestion={() => {
              if ("title" in docOrQuestion) {
                return
              }

              return onOpenDialog({
                initialValue: docOrQuestion,
                onSubmit: defaultSubmit,
              })
            }}
            onClickDoc={(e) => {
              // @ts-expect-error
              liProps.onClick(e)
            }}
          />
        )}
        getOptionLabel={() => searchQuery}
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
  )
}

export default QuestionsSearchBar
