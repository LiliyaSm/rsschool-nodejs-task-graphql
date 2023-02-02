import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';
import { PostEntity } from '../../../utils/DB/entities/DBPosts';
import { MemberTypeEntity } from '../../../utils/DB/entities/DBMemberTypes';
import { IContext } from '../loader';

export const createUser = async (
  parent: UserEntity,
  args: { input: Omit<UserEntity, 'id' | 'subscribedToUserIds'> },
  context: IContext
): Promise<UserEntity | null> => {
  return await context.fastify.db.users.create(args.input);
};

export const createProfile = async (
  parent: UserEntity,
  args: { input: Omit<ProfileEntity, 'id'> },
  context: IContext
): Promise<ProfileEntity | null> => {
  return await context.fastify.db.profiles.create(args.input);
};

export const createPost = async (
  parent: UserEntity,
  args: { input: Omit<PostEntity, 'id'> },
  context: IContext
): Promise<PostEntity | null> => {
  return await context.fastify.db.posts.create(args.input);
};

export const updateUser = async (
  parent: UserEntity,
  args: {
    id: string;
    input: Partial<Omit<UserEntity, 'id' | 'subscribedToUserIds'>>;
  },
  context: IContext
): Promise<UserEntity | null> => {
  const id = args.id;
  const user = await context.fastify.db.users.findOne({ key: 'id', equals: id });
  if (!user) {
    throw new Error('User not found');
  } else {
    const updatedUser = await context.fastify.db.users.change(id, args.input);
    return updatedUser;
  }
};

export const updateProfile = async (
  parent: UserEntity,
  args: { id: string; input: Partial<Omit<ProfileEntity, 'id' | 'UserId'>> },
  context: IContext
): Promise<ProfileEntity | null> => {
  const { id, input } = args;
  const profile = await context.fastify.db.profiles.findOne({
    key: 'id',
    equals: id,
  });
  if (!profile) {
    throw new Error('Profile not found');
  } else {
    const updatedProfile = await context.fastify.db.profiles.change(id, input);
    return updatedProfile;
  }
};

export const updatePost = async (
  parent: UserEntity,
  args: { id: string; input: Partial<Omit<PostEntity, 'id' | 'UserId'>> },
  context: IContext
) => {
  const { id, input } = args;
  const post = await context.fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!post) {
    throw new Error('Post not found');
  } else {
    const updatedPost = await context.fastify.db.posts.change(id, input);
    return updatedPost;
  }
};

export const updateMemberType = async (
  parent: UserEntity,
  args: { id: string; input: Partial<Omit<MemberTypeEntity, 'id'>> },
  context: IContext
) => {
  const { id, input } = args;
  const memberType = await context.fastify.db.memberTypes.findOne({
    key: 'id',
    equals: id,
  });
  if (!memberType) {
    throw new Error('MemberType not found');
  } else {
    const updatedMemberTypes = await context.fastify.db.memberTypes.change(id, input);
    return updatedMemberTypes;
  }
};

export const subscribeUserTo = async (
  parent: UserEntity,
  args: { id: string; input: Pick<UserEntity, 'id'> },
  context: IContext
) => {
  const {
    id,
    input: { id: subscribeUserId },
  } = args;
  const user = await context.fastify.db.users.findOne({
    key: 'id',
    equals: subscribeUserId,
  });
  if (!user) {
    throw new Error('User not found!');
  } else if (user.subscribedToUserIds.includes(id)){
    throw new Error('User already subscribed!');
  } else{
    const subscribedToUserIds = [...user.subscribedToUserIds, id];
    const updatedUser = await context.fastify.db.users.change(subscribeUserId, {
      subscribedToUserIds,
    });
    return updatedUser;
  }
};

export const unsubscribeUser = async (
  parent: UserEntity,
  args: { id: string; input: Pick<UserEntity, 'id'> },
  context: IContext
) => {
  const {
    id,
    input: { id: unsubscribeUserId },
  } = args;
  const user = await context.fastify.db.users.findOne({
    key: 'id',
    equals: unsubscribeUserId,
  });
  if (!user) {
    throw new Error('User not found!');
  } else if (!user.subscribedToUserIds.includes(id)) {
    throw new Error('User is not following this user');
  } else {
    const subscribedToUserIds = user.subscribedToUserIds.filter(
      (el) => id !== el
    );
    const updatedUser = await context.fastify.db.users.change(unsubscribeUserId, {
      subscribedToUserIds,
    });
    return updatedUser;
  }
};

