import { FastifyInstance } from 'fastify';
import * as DataLoader from 'dataloader';
import { UserEntity } from '../../utils/DB/entities/DBUsers';

export interface ILoader {
  users: DataLoader<unknown, UserEntity[], unknown>
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
  }
}

export function getContext(fastify: FastifyInstance) : IContext {
  return {
    fastify,
    loader: createLoader(fastify)
  };
}
