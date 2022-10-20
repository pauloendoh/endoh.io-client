import { DocDto } from "../define/DocDto"
import { NoteDto } from "../define/NoteDto"

export interface NotesSearchResultsDto {
  notes: NoteDto[]
  docs: DocDto[]
}
