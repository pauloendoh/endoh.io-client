import { Box, Typography } from "@material-ui/core";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "store/store";
import FlexHCenter from "../../../../components/shared/Flexboxes/FlexHCenter";
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter";
import MyTextField from "../../../../components/shared/MyInputs/MyTextField";
import PlaceIcon from "../../../../components/shared/PlaceIcon";
import * as monerateActions from "../../../../store/monerate/monerateActions";
import PlaceGetDto from "../../../../types/domain/monerate/PlaceGetDto";

// PE 2/3
const SelectPlaceInput: React.FC<Props> = (props) => {
  // PE 1/3 20210113
  const initialPlace = props.value
    ? props.places.find((p) => p.id === props.value)
    : null;

  // localValue ?
  const [place, setPlace] = useState<PlaceGetDto>(initialPlace);

  return (
    <Box>
      <Autocomplete
        id="select-place-input"
        value={place}
        options={[
          ...props.places,
          {
            // create a newPlaceDto() or something
            id: null,
            userId: 0,
            name: "+ New place",
            icon: "",
            bgColor: "",
            createdAt: "",
            updatedAt: "",
          },
        ]}
        renderOption={(option) => (
          // divide into a component?
          <FlexVCenter>
            {option.id ? (
              <FlexVCenter>
                <Box minWidth={30}>
                  <PlaceIcon place={option} />
                </Box>
                <Box ml={1}>
                  <Typography variant="body2">{option.name}</Typography>
                </Box>
              </FlexVCenter>
            ) : (
              <FlexHCenter>{option.name}</FlexHCenter>
            )}
          </FlexVCenter>
        )}
        getOptionLabel={(option) => option.name}
        style={{ width: 200 }}
        renderInput={(params) => (
          <MyTextField {...params} placeholder="e.g.: Amazon" size="small" />
        )}
        onChange={(e, value) => {
          // create a handleChange method
          const place = value as PlaceGetDto;
          if (place && place.id === null) {
            props.startNewPlace();
          } else {
            setPlace(place);
            props.onChange(e, place, null);
          }
        }}
      />
    </Box>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  places: state.monerate.places,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // add place
  setPlaces: (places: PlaceGetDto[]) =>
    dispatch(monerateActions.setPlaces(places)),

  startNewPlace: () => dispatch(monerateActions.startNewPlace()),
});

interface OwnProps {
  value: number;
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown>
  ) => void;
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlaceInput);
