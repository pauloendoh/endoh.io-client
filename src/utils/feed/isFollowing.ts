import { FollowingTagDto } from "../../types/domain/feed/FollowingTagDto";

// Returns the number of tags that the auth user is following (userId)
export const isFollowing = (
  userId: number,
  followingTags: FollowingTagDto[]
) => {
  return followingTags.filter((fTag) => fTag.followingUserId === userId).length;
};
