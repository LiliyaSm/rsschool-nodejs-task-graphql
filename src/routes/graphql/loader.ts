import { FastifyInstance } from 'fastify';
import * as DataLoader from 'dataloader';
import { UserEntity } from '../../utils/DB/entities/DBUsers';
import { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { PostEntity } from '../../utils/DB/entities/DBPosts';
import { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';

export interface ILoader {
  users: DataLoader<unknown, UserEntity[], unknown>
  profile: DataLoader<unknown, ProfileEntity | null, unknown>
  memberType: DataLoader<unknown, MemberTypeEntity | null, unknown>
  posts: DataLoader<unknown, PostEntity[], unknown>
}
export interface IContext {
  fastify: FastifyInstance
  loader: ILoader
}

function createLoader(fastify: FastifyInstance): ILoader {
  return {
    users: new DataLoader(async (c: readonly string[]) => {
      const users = await fastify.db.users.findMany();
      return c.map(() => users);
    }),
    profile: new DataLoader(async (list: readonly string[]) => {
       var profiles = await fastify.db.profiles.findMany({
        key: 'userId',
        equalsAnyOf: list as string[],
      });
      return list.map(x => profiles.find(p => p.userId ==x) || null);
    }),
    memberType: new DataLoader(async (list: readonly string[]) => {
      var memberTypes = await fastify.db.memberTypes.findMany({
        key: 'id',
        equalsAnyOf: list as string[],
      });
      return list.map(x => memberTypes.find(p => p.id == x) || null);
    }),
    posts: new DataLoader(async (list: readonly string[]) => {
      const posts = await fastify.db.posts.findMany({
        key: 'userId',
        equalsAnyOf: list as string[],
      });
      return list.map(x => posts.filter(p => p.userId == x));
    }),
  }
}

export function getContext(fastify: FastifyInstance) : IContext {
  return {
    fastify,
    loader: createLoader(fastify)
  };
}
