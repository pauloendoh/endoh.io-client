import { IsDateString, IsNumberString } from "class-validator"

export class ValidLearningInput {
  id?: number

  description: string

  isHighlight: boolean

  @IsDateString()
  datetime: string

  @IsNumberString()
  points: string
}
