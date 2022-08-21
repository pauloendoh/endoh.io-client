import { Box, Container } from "@material-ui/core";
import ExpenseButtonDialog from "../Modals/ExpenseButtonDialog";
import MonerateTabs from "../MonerateTabs/MonerateTabs";

interface Props {
  children?: React.ReactNode;
}

const MonerateLayout = (props: Props) => {
  return (
    <Container>
      <Box mt={4}></Box>

      <MonerateTabs />

      <Box mt={4} />
      <ExpenseButtonDialog />

      {props.children}
    </Container>
  );
};

export default MonerateLayout;
