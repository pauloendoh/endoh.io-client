import { DocDto } from "../../types/domain/define/DocDto";
import { NoteDto } from "../../types/domain/define/NoteDto";

export enum defineActionTypes {
  CLEAR_DEFINE_REDUCER = "@define/CLEAR_DEFINE_REDUCER",
  SET_DOCS = "@define/SET_DOCS",
  ADD_OR_REPLACE_DOC = "@define/ADD_OR_REPLACE_DOC",
  SET_NOTES = "@define/SET_NOTES",
  ADD_OR_REPLACE_NOTE = "@define/ADD_OR_REPLACE_NOTE",
}

export interface DefineState {
  docs: DocDto[];
  notes: NoteDto[];
  hasFirstLoaded: boolean;
}
