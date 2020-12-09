import { Box } from "@material-ui/core";
import Flex from "components/shared/Flexboxes/Flex";
import API from "consts/API";
import { ResourceDto } from "dtos/relearn/ResourceDto";
import { TagDto } from "../../../dtos/relearn/TagDto";
import LoadingPage from "pages/index/LoadingPage";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import myAxios from "utils/myAxios";
import * as relearnActions from "../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../store/store";
import ResourceItem from "../Content/ResourceItem";
import EditResourceDialog from "../Dialogs/EditResourceDialog";
import RelearnSidebar from "../RelearnSidebar/RelearnSidebar";

// PE 3/3
const RelearnPage = (props: Props) => {
  const [isLoadingResources, setIsLoadingResources] = useState(true);

  useEffect(
    () => {
      myAxios
        .get<ResourceDto[]>(API.relearn.resource)
        .then((res) => {
          props.setResources(res.data);
        })
        .finally(() => {
          setIsLoadingResources(false);
        });

  
     
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Flex height="100%">
      <RelearnSidebar />
      <Box pt={1} px={4} flexGrow={1}>
        {isLoadingResources ? (
          <LoadingPage />
        ) : (
          <Box>
            {props.resources.map((resource) => (
              <ResourceItem key={resource.id} resource={resource} />
            ))}
          </Box>
        )}
      </Box>

      <EditResourceDialog />
    </Flex>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.relearn.resources,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RelearnPage);
