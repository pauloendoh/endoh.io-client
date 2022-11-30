import { DocDto } from "../questions/DocDto"
import { NoteDto } from "../questions/NoteDto"

export interface NotesSearchResultsDto {
  notes: NoteDto[]
  docs: DocDto[]
}
