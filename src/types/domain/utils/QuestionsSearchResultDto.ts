import { DocDto } from "../questions/DocDto"
import { QuestionDto } from "../questions/QuestionDto"

export interface QuestionsSearchResultDto {
  notes: QuestionDto[]
  docs: DocDto[]
}
