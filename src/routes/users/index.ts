import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (): Promise<UserEntity[]> {
    return fastify.db.users.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await fastify.db.users.findOne({
        key: 'id',
        equals: request.params.id,
      });
      if (!user) {
        reply.statusCode = 404;
        throw new Error('User not found!');
      } else {
        return user;
      }
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request): Promise<UserEntity> {
      return fastify.db.users.create(request.body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const id = request.params.id;
      const user = await fastify.db.users.findOne({
        key: 'id',
        equals: request.params.id,
      });
      if (!user) {
        reply.statusCode = 400;
        throw new Error('Id is incorrect');
      } else {
        const profile = await fastify.db.profiles.findOne({
          key: 'userId',
          equals: id,
        });
        if (profile) await fastify.db.profiles.delete(profile.id);
        const subscribedUsers = await fastify.db.users.findMany({
          key: 'subscribedToUserIds',
          inArray: id,
        });

        subscribedUsers.forEach(async (user) => {
          const subscribedToUserIds = user.subscribedToUserIds.filter(
            (el) => id !== el
          );
          await fastify.db.users.change(user.id, {
            subscribedToUserIds,
          });
        });

        const userPosts = await fastify.db.posts.findMany({
          key: 'userId',
          equals: id,
        });

        userPosts.forEach(async (post) => {
          await fastify.db.posts.delete(post.id);
        });
        return await fastify.db.users.delete(id);
      }
    }
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const id = request.params.id;
      const user = await fastify.db.users.findOne({
        key: 'id',
        equals: request.body.userId,
      });
      if (!user) {
        reply.statusCode = 404;
        throw new Error('User not found!');
      } else {
        const subscribedToUserIds = [...user.subscribedToUserIds, id];
        const updatedUser = await fastify.db.users.change(request.body.userId, {
          subscribedToUserIds,
        });
        return updatedUser;
      }
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const id = request.params.id;
      const user = await fastify.db.users.findOne({
        key: 'id',
        equals: request.body.userId,
      });
      if (!user) {
        reply.statusCode = 404;
        throw new Error('User not found!');
      } else if (!user.subscribedToUserIds.includes(id)) {
        reply.statusCode = 400;
        throw new Error('User is not following this user');
      } else {
        const subscribedToUserIds = user.subscribedToUserIds.filter(
          (el) => id !== el
        );
        const updatedUser = await fastify.db.users.change(request.body.userId, {
          subscribedToUserIds,
        });
        return updatedUser;
      }
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const id = request.params.id;
      const user = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!user) {
        reply.statusCode = 400;
        throw new Error('Id is incorrect');
      } else {
        const updatedUser = await fastify.db.users.change(id, request.body);
        return updatedUser;
      }
    }
  );
};

export default plugin;
