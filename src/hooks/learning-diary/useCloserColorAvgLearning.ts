import useAvgLearnings from "./useAvgLearnings";

const useCloserColorAvgLearning = (value: number) => {
  const { avg, avg125 } = useAvgLearnings();

  if (avg === 0) return "yellow";

  if (value < avg) return "red";
  if (value < avg125) return "yellow";
  return "green";
};

export default useCloserColorAvgLearning;
