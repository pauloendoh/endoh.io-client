import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import PATHS from "../../../utils/consts/PATHS";
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
      history.push(PATHS.search(values.searchQuery));
  };

  const ctrlSubmit = (values: ISearchForm) => {
    if (values.searchQuery?.length) {
      window.open(PATHS.search(values.searchQuery));
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name="searchQuery"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <MyTextField
            label="Search endoh.io"
            style={{ width: 184 }}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            onCtrlEnter={(e) => {
              ctrlSubmit(getValues());
            }}
            inputRef={ref}
          />
        )}
      />
    </form>
  );
};

export default SearchBar;
