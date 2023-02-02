import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { MemberTypeEntity } from '../../../utils/DB/entities/DBMemberTypes';
import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';
import { PostEntity } from '../../../utils/DB/entities/DBPosts';
import { IContext } from '../loader';

export const getAllUsers = async (
  parent: unknown,
  args: unknown,
  context: IContext
): Promise<UserEntity[]> => {
  return await context.loader.users.load('');
};

export const getUser = async (
  parent: unknown,
  args: { id: string },
  context: IContext
): Promise<UserEntity | null> => {
  const user = await context.fastify.db.users.findOne({
    key: 'id',
    equals: args.id,
  });
  if (user) return user;
  throw new Error('User not found');
};

export const getAllPosts = async (
  parent: unknown,
  args: unknown,
  context: IContext
): Promise<PostEntity[]> => {
  return await context.fastify.db.posts.findMany();
};

export const getPost = async (
  parent: unknown,
  args: { id: string },
  context: IContext
): Promise<PostEntity | null> => {
  const post = await context.fastify.db.posts.findOne({
    key: 'id',
    equals: args.id,
  });
  if (post) return post;
  throw new Error('Post not found');
};

export const getAllProfiles = async (
  parent: unknown,
  args: unknown,
  context: IContext
): Promise<ProfileEntity[]> => {
  return await context.fastify.db.profiles.findMany();
};

export const getProfile = async (
  parent: unknown,
  args: { id: string },
  context: IContext
): Promise<ProfileEntity | null> => {
  const profile = await context.fastify.db.profiles.findOne({
    key: 'id',
    equals: args.id,
  });
  if (profile) return profile;
  throw new Error('Profile not found');
};

export const getAllMemberTypes = async (
  parent: unknown,
  args: unknown,
  context: IContext
): Promise<MemberTypeEntity[]> => {
  return await context.fastify.db.memberTypes.findMany();
};

export const getMemberType = async (
  parent: unknown,
  args: { id: string },
  context: IContext
): Promise<MemberTypeEntity | null> => {
  const memberType = await context.fastify.db.memberTypes.findOne({
    key: 'id',
    equals: args.id,
  });
  if (memberType) return memberType;
  throw new Error('MemberType not found');
};
