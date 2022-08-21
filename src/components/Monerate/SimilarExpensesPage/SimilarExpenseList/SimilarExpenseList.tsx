import ExpenseListItem from "components/Monerate/ExpenseList/ExpenseListItem/ExpenseListItem";
import useSimilarExpensesQuery from "hooks/react-query/monerate/useSimilarExpensesQuery";

interface Props {
  expenseValue: number;
}

const SimilarExpenseList = (props: Props) => {
  const { data: expenses } = useSimilarExpensesQuery(props.expenseValue);
  return (
    <div>
      {expenses.map((expense) => (
        <ExpenseListItem expense={expense} />
      ))}
    </div>
  );
};

export default SimilarExpenseList;
