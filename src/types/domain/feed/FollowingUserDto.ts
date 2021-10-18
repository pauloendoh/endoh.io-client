import { TagDto } from "../relearn/TagDto";

export interface FollowingUserDto {
  followingUser: {
    userId: number;
    username: string;
    fullName: string;
    pictureUrl: string;
  };
  tags: TagDto[];
}
