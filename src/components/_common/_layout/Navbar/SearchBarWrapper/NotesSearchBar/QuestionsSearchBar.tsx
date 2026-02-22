import { Autocomplete, Popper } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { queryKeys } from "hooks/react-query/queryKeys"
import useQuestionsSearchQuery from "hooks/react-query/search/useQuestionsSearchQuery"
import useDebounce from "hooks/utils/useDebounce"
import React, { useEffect, useMemo, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { useHotkeys } from "react-hotkeys-hook"
import { useSearchParams } from "react-router-dom"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import { SearchResultsDto } from "types/domain/utils/SearchResultsDto"
import { urls } from "utils/urls"
import MyTextField from "../../../../../_UI/MyInputs/MyTextField"
import QuestionsSearchBarOption from "./NotesSearchBarOption/QuestionsSearchBarOption"
import { FlashnotesSearchType } from "./types/FlashnotesSearchType"

interface Props {
  type: FlashnotesSearchType
  autoFocus?: boolean
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

  const form = useForm<ISearchForm>({
    defaultValues: {
      searchQuery: "",
    },
  })

  const searchQuery = useMemo(
    () => form.watch("searchQuery") || "",
    [form.watch("searchQuery")],
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

  const [searchParams] = useSearchParams()
  useEffect(() => {
    qc.cancelQueries([queryKeys.questionsSearchResults])
    qc.setQueryData<SearchResultsDto>(
      [queryKeys.questionsSearchResults],
      undefined,
    )
  }, [searchParams])

  const debouncedSearchQuery = useDebounce(form.watch("searchQuery"), 250)

  useEffect(() => {
    refetch()
  }, [debouncedSearchQuery])

  const sortedOptions = useMemo(() => {
    if (searchResults?.questions && searchResults?.docs)
      return [...searchResults.docs, ...searchResults.questions.slice(0, 25)]

    return []
  }, [searchResults?.questions, searchResults?.docs])

  const [openQuestionDialog] = useQuestionDialogStore((s) => [s.openDialog])

  const inputRef = useRef<HTMLInputElement | null>(null)
  useHotkeys("f", () => {
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 100)
  })

  const defaultSubmit = useDefaultSubmitQuestion()

  return (
    // PE 1/3 - doesn't need this submit and <form> ?
    <form onSubmit={form.handleSubmit(submit)}>
      <Autocomplete
        loading={isFetching}
        // if no text, show nothing (don't show 'no resources :(')
        noOptionsText={
          searchQuery.length >= MIN_LENGTH &&
          debouncedSearchQuery === form.watch("searchQuery")
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

              return openQuestionDialog({
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
            control={form.control}
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
                autoFocus={props.autoFocus}
                onFocus={() => refetch()}
                onCtrlEnter={(e) => {
                  ctrlSubmit(form.getValues())
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
