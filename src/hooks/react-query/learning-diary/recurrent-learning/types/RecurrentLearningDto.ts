import { IsNumber, IsString, Min, MinLength } from "class-validator"

export class RecurrentLearningDto {
  id: number

  userId: number

  @IsString()
  @MinLength(1)
  description: string

  @IsNumber()
  @Min(0)
  points: number

  createdAt: string

  updatedAt: string
}

export function buildRecurrentLearningDto(
  p?: Partial<RecurrentLearningDto>
): RecurrentLearningDto {
  return {
    id: 0,
    userId: 0,
    description: "",
    points: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...p,
  }
}
