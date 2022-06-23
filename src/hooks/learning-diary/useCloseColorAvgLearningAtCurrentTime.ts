import useAvgLearningAtCurrentTime from "./useAvgLearningAtCurrentTime";

const useCloseColorAvgLearningAtCurrentTime = (value: number) => {
  const { avg, avg125 } = useAvgLearningAtCurrentTime();

  if (avg === 0) return "yellow";

  if (value < avg) return "red";
  if (value < avg125) return "yellow";
  return "green";
};

export default useCloseColorAvgLearningAtCurrentTime;
