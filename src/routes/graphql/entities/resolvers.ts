import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';
import { PostEntity } from '../../../utils/DB/entities/DBPosts';
import { MemberTypeEntity } from '../../../utils/DB/entities/DBMemberTypes';
import { IContext } from '../loader';

export const getAllProfiles = async (
  parent: UserEntity,
  args: unknown,
  context: IContext
): Promise<ProfileEntity[]> => {
  return await context.fastify.db.profiles.findMany();
};

export const getProfileByUserId = async (
  parent: UserEntity,
  args: unknown,
  context: IContext
): Promise<ProfileEntity | null> => {
  return await context.loader.profile.load(parent.id);
};

export const getAllPostsByUserId = async (
  parent: UserEntity,
  args: unknown,
  context: IContext
): Promise<PostEntity[]> => {
  return context.loader.posts.load(parent.id);
};

export const getMemberType = async (
  parent: UserEntity,
  args: unknown,
  context: IContext
): Promise<MemberTypeEntity | null> => {
  const profile = await context.loader.profile.load(parent.id);

  if (profile) {
    const memberType = await context.loader.memberType.load(profile.memberTypeId)
    return memberType;
  }
  return null;
};

export const getAllMemberTypes = async (
  parent: UserEntity,
  args: unknown,
  context: IContext
): Promise<MemberTypeEntity[]> => {
  return await context.fastify.db.memberTypes.findMany();
};

export const getUserSubscribedTo = async (
  parent: UserEntity,
  args: unknown,
  context: IContext
): Promise<UserEntity[]> => {
  return (await context.loader.users.load('')).filter(
    (user) => parent.subscribedToUserIds.includes(user.id)
  );
};

export const getSubscribedToUser = async (
  parent: UserEntity,
  args: unknown,
  context: IContext
): Promise<UserEntity[]> => {
  return (await context.loader.users.load('')).filter((user) =>
    user.subscribedToUserIds.includes(parent.id)
  );
};
