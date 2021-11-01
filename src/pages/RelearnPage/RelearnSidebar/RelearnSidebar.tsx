import { List } from "@material-ui/core";
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
      <List disablePadding>
        <RelearnSidebarTagList type="public" lists={publicLists} />
        <RelearnSidebarTagList type="private" lists={privateLists} />
      </List>
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
