import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import pageUrls from "../../../utils/consts/pageUrls";
import MyTextField from "../../shared/MyInputs/MyTextField";

interface ISearchForm {
  searchQuery?: string;
}

// PE 3/3
const SearchBar = () => {
  const history = useHistory();
  const { handleSubmit, control, getValues } = useForm<ISearchForm>({
    defaultValues: {
      searchQuery: "",
    },
  });

  const submit = (values: ISearchForm) => {
    if (values.searchQuery?.length)
      history.push(pageUrls.search(values.searchQuery));
  };

  const ctrlSubmit = (values: ISearchForm) => {
    if (values.searchQuery?.length) {
      window.open(pageUrls.search(values.searchQuery));
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        render={({ field }) => (
          <MyTextField
            {...field}
            label="Search endoh.io"
            style={{ width: 184 }}
            onCtrlEnter={(e) => {
              ctrlSubmit(getValues());
            }}
          />
        )}
        control={control}
        name="searchQuery"
      />
    </form>
  );
};

export default SearchBar;
