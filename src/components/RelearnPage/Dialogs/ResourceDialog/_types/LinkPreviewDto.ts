import { ResourceDto } from "../../../../../types/domain/relearn/ResourceDto";

export interface LinkPreviewDto {
  title: string;
  image: string;
  description: string;
  url: string;
  duration: string;

  alreadySavedResource?: ResourceDto;
}
