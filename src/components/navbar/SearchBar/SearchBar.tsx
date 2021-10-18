import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import PATHS from "../../../consts/PATHS";
import MyTextField from "../../shared/MyInputs/MyTextField";

// PE 3/3
const SearchBar = () => {
  const history = useHistory();

  return (
    // PE 1/3 remove this box?
    <Box>
      <Formik
        initialValues={{ query: "" }}
        // PE 2/3 - criar um goToSearchPage ?
        onSubmit={(values) => {
          if (values.query.length) history.push(PATHS.search(values.query));
        }}
      >
        {({ handleChange }) => (
          <Form>
            <MyTextField
              id="query"
              name="query"
              label="Search endoh.io"
              style={{ width: 184 }}
              onChange={handleChange}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchBar;
