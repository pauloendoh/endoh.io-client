import { DecisionTableDto } from "../../../types/domain/big-decisions/DecisionTableDto";
import getFinalWeight from "./getFinalWeight";

// if returns null, it means there are at least two winners
const getWinnerTable = (tables: DecisionTableDto[]) => {
  const finalWeights = tables.map((t) => getFinalWeight(t.items));
  const minFinalWeight = Math.min.apply(null, finalWeights);
  const winners = tables.filter(
    (t) => getFinalWeight(t.items) === minFinalWeight
  );
  if (winners.length > 1) return null;
  if (winners.length === 1) return winners[0];
};

export default getWinnerTable;
