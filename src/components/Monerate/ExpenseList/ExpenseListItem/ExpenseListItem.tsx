import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import CategoryIcon from "components/_UI/CategoryIcon";
import Flex from "components/_UI/Flexboxes/Flex";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import PlaceIcon from "components/_UI/PlaceIcon";
import SoloRatingStar from "components/_UI/SoloRatingStar";
import React from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { editExpense } from "store/monerate/monerateActions";
import ExpenseGetDto from "types/domain/monerate/ExpenseGetDto";

interface OwnProps {
  expense: ExpenseGetDto;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editExpense: (expense: ExpenseGetDto) => dispatch(editExpense(expense)),
});

type Props = OwnProps &
  React.ComponentProps<typeof Paper> &
  ReturnType<typeof mapDispatchToProps>;

const ExpenseListItem = ({ expense, editExpense }: Props) => {
  return (
    <Button
      key={expense.id}
      onClick={() => {
        editExpense(expense);
      }}
      fullWidth
      style={{ textAlign: "inherit", fontWeight: "normal" }}
      className="expense-item"
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={3}>
          {expense.place ? (
            <FlexVCenter>
              <PlaceIcon place={expense.place} />
              <Box ml={1}>{expense.place.name}</Box>
            </FlexVCenter>
          ) : null}
        </Grid>
        <Grid item xs={2}>
          {expense.name}
        </Grid>

        <Grid item xs={2}>
          <Typography color="error">
            <NumberFormat
              value={expense.value}
              thousandSeparator
              displayType="text"
              prefix="$"
              decimalScale={2}
              fixedDecimalScale={expense.value % 1 !== 0}
            />
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6">
            <Flex justifyContent="flex-end">
              <SoloRatingStar value={expense.rating} color="#ffb400" />
            </Flex>
          </Typography>
        </Grid>
        <Grid item xs>
          {expense.category ? (
            <FlexVCenter key={expense.category.id}>
              <CategoryIcon category={expense.category} />
              <Box ml={1}>{expense.category.name}</Box>
            </FlexVCenter>
          ) : null}
        </Grid>
        <Grid item xs>
          {expense.description}
        </Grid>
      </Grid>
    </Button>
  );
};

export default connect(undefined, mapDispatchToProps)(ExpenseListItem);
