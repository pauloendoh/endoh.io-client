import { Reducer } from "redux"
import { DocDto } from "../../dtos/define/DocDto"
import { NoteDto } from "../../dtos/define/NoteDto"
import { DefineActionReturns } from "./defineActions"
import { defineActionTypes, DefineState } from "./defineTypes"

const INITIAL_STATE: DefineState = {
  docs: [],
  notes: [],
  hasFirstLoaded: false,
}

const defineReducer: Reducer<DefineState, DefineActionReturns> = (
  state = INITIAL_STATE,
  action: DefineActionReturns
): DefineState => {
  switch (action.type) {
    case defineActionTypes.SET_DOCS:
      return { ...state, docs: action.payload, hasFirstLoaded: true }
    case defineActionTypes.ADD_OR_REPLACE_DOC:
      return addOrReplaceDoc(state, action.payload)
    case defineActionTypes.SET_NOTES:
      return { ...state, notes: action.payload }
    case defineActionTypes.ADD_OR_REPLACE_NOTE:
      return addOrReplaceNote(state, action.payload)
    default:
      return { ...state }
  }
}

const addOrReplaceDoc = (state: DefineState, doc: DocDto): DefineState => {
  const docs = [...state.docs]

  const index = docs.findIndex((d) => d.id === doc.id)
  if (~index) {
    docs[index] = doc
  } else {
    docs.push(doc)
  }

  return { ...state, docs }
}

const addOrReplaceNote = (state: DefineState, note: NoteDto): DefineState => {
  const notes = [...state.notes]

  const index = notes.findIndex((n) => n.id === note.id)
  if (~index) {
    notes[index] = note
  } else {
    notes.push(note)
  }

  return { ...state, notes: notes }
}

export default defineReducer
