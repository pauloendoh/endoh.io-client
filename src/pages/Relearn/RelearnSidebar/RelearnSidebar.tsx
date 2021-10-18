import { Box, List } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import MySidebar from "../../../components/shared/MySidebar";
import { ApplicationState } from "../../../store/store";
import { TagDto } from "../../../types/domain/relearn/TagDto";
import RelearnSidebarTagList from "./RelearnSidebarTagList/RelearnSidebarTagList";

function RelearnSidebar(props: Props) {
  const [publicLists, setPublicLists] = useState<TagDto[]>([]);
  const [privateLists, setPrivateLists] = useState<TagDto[]>([]);
  useEffect(() => {
    setPublicLists(props.tags.filter((t) => t.isPrivate === false));
    setPrivateLists(props.tags.filter((t) => t.isPrivate === true));
  }, [props.tags]);

  return (
    <MySidebar>
      <Box>
        <List disablePadding>
          {/* PE 2/3 - Muito grande para mostrar apenas "Untagged - 16" */}
          {/* criar um <UntaggedLi/> ? */}

          <RelearnSidebarTagList lists={publicLists} type="public" />

          <RelearnSidebarTagList lists={privateLists} type="private" />
        </List>
      </Box>
    </MySidebar>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  tags: state.relearn.tags,
  resources: state.relearn.resources,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(RelearnSidebar);
