import { action } from "typesafe-actions"
import { DocDto } from "../../dtos/define/DocDto"
import { NoteDto } from "../../dtos/define/NoteDto"
import { defineActionTypes } from "./defineTypes"


export const clearDefineReducer = () =>
  action(defineActionTypes.CLEAR_DEFINE_REDUCER)

export const setDocs = (docs: DocDto[]) =>
  action(defineActionTypes.SET_DOCS, docs)

export const addOrReplaceDoc = (doc: DocDto) =>
  action(defineActionTypes.ADD_OR_REPLACE_DOC, doc)

export const setNotes = (notes: NoteDto[]) =>
  action(defineActionTypes.SET_NOTES, notes)

export const addOrReplaceNote = (note: NoteDto) =>
  action(defineActionTypes.ADD_OR_REPLACE_NOTE, note)

// PE 2/3 - Perigo da pessoa esquecer de colocar aqui....
export type DefineActionReturns =
  | ReturnType<typeof clearDefineReducer>
  | ReturnType<typeof setDocs>
  | ReturnType<typeof addOrReplaceDoc>
  | ReturnType<typeof setNotes>
  | ReturnType<typeof addOrReplaceNote>
