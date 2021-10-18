import { ResourceDto } from "../../types/domain/relearn/ResourceDto";
import { TagDto } from "../../types/domain/relearn/TagDto";

export enum relearnActionTypes {
  SET_RESOURCES = "@relearn/SET_RESOURCES",
  SET_TAGS = "@relearn/SET_TAGS",

  REMOVE_RESOURCE = "@relearn/REMOVE_RESOURCE",
  REMOVE_TAG = "@relearn/REMOVE_TAG",

  SET_EDITING_RESOURCE = "@relearn/SET_EDITING_RESOURCE",
  SET_EDITING_TAG = "@relearn/SET_EDITING_TAG",

  MOVE_RESOURCE = "@relearn/MOVE_RESOURCE",

  CLEAR_RELEARN_REDUCER = "@relearn/CLEAR_RELEARN_REDUCER",
}

export interface RelearnState {
  resources: ResourceDto[];
  hasFirstLoaded: boolean;
  tags: TagDto[];

  editingResource: ResourceDto;
  editingTag: TagDto;
}
