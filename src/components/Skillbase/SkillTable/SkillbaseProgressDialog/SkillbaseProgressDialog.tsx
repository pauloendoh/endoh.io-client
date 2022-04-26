import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import FlexCol from "components/_UI/Flexboxes/FlexCol";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import FlexVCenterBetween from "components/_UI/Flexboxes/FlexVCenterBetween";
import Txt from "components/_UI/Text/Txt";
import React, { useEffect, useState } from "react";
import { MdClose, MdOutlineArrowRightAlt } from "react-icons/md";
import useProgressesQuery from "../../../../hooks/react-query/skillbase/skill-progress/useProgressesQuery";
import useSkillProgressMonthsQuery from "../../../../hooks/react-query/skillbase/skill-progress/useSkillProgressMonthsQuery";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SkillbaseProgressDialog = (props: Props) => {
  const [selectedMonth, setSelectedMonth] = useState("");

  const { data: months } = useSkillProgressMonthsQuery();
  const {
    data: progresses,
    isFetching,
    refetch,
  } = useProgressesQuery(selectedMonth);

  useEffect(() => {
    if (props.open) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  useEffect(() => {
    if (months?.length > 0) setSelectedMonth(months[0]);
  }, [months]);

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="progress-dialog"
    >
      <Box pb={1}>
        <DialogTitle id="progress-dialog-title">
          <FlexVCenter justifyContent="space-between">
            <Txt variant="h5">Your Progress</Txt>
            <IconButton onClick={props.onClose}>
              <MdClose />
            </IconButton>
          </FlexVCenter>
        </DialogTitle>

        <DialogContent>
          <FormControl variant="outlined" size="small">
            <InputLabel id="progress-dialog-select-label">
              From month
            </InputLabel>

            <Select
              id="demo-simple-select-outlined"
              label="From month"
              labelId="progress-dialog-select-label"
              value={selectedMonth}
              onChange={(e, value) => setSelectedMonth(value as string)}
            >
              {months?.map((month) => (
                <MenuItem value={month} key={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={2}>
            {isFetching ? (
              <Txt>Loading...</Txt>
            ) : (
              <>
                {progresses?.length > 0 && (
                  <Txt variant="h6">Highest improvements</Txt>
                )}

                <Box mt={2} />
                {progresses?.map((progress) => (
                  <FlexVCenter key={progress.skillId}>
                    <div style={{ width: 150 }}>
                      {progress.currentName === progress.previousName ? (
                        <Txt>{progress.currentName}</Txt>
                      ) : (
                        <>
                          <Txt style={{ textDecoration: "line-through" }}>
                            {progress.previousName}
                          </Txt>
                          <Txt>{progress.currentName}</Txt>
                        </>
                      )}
                    </div>

                    <FlexVCenterBetween style={{ width: 100 }}>
                      <Txt>{progress.previousLevel || "?"}</Txt>
                      <FlexCol style={{ alignItems: "center" }}>
                        <Txt
                          style={{
                            fontSize: 10,
                            top: 8,
                            position: "relative",
                          }}
                        >
                          {progress.levelImprovement > 0
                            ? `+${progress.levelImprovement}`
                            : progress.levelImprovement}
                        </Txt>

                        <MdOutlineArrowRightAlt size="24px" />
                      </FlexCol>
                      <Txt>{progress.currentLevel}</Txt>
                    </FlexVCenterBetween>
                  </FlexVCenter>
                ))}
              </>
            )}
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default SkillbaseProgressDialog;
