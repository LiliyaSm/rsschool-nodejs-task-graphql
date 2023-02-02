import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<ProfileEntity[]> {
    return await fastify.db.profiles.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const profile = await fastify.db.profiles.findOne({
        key: 'id',
        equals: request.params.id,
      });
      if (!profile) {
        reply.statusCode = 404;
        throw new Error('Profile not found!');
      } else {
        return profile;
      }
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },

    async function (request, reply): Promise<ProfileEntity> {
      const memberType = await fastify.db.memberTypes.findOne({
        key: 'id',
        equals: request.body.memberTypeId,
      });
      const profile = await fastify.db.profiles.findOne({
        key: 'userId',
        equals: request.body.userId,
      });
      if (!memberType) {
        reply.statusCode = 400;
        throw new Error('MemberType does not exist');
      }
      if (profile) {
        reply.statusCode = 400;
        throw new Error('User already has a profile');
      }
      return await fastify.db.profiles.create(request.body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const id = request.params.id;
      const profile = await fastify.db.profiles.findOne({
        key: 'id',
        equals: id,
      });
      if (!profile) {
        reply.statusCode = 400;
        throw new Error('Id is incorrect');
      } else {
        return await fastify.db.profiles.delete(id);
      }
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const id = request.params.id;
      const profile = await fastify.db.profiles.findOne({
        key: 'id',
        equals: id,
      });
      if (!profile) {
        reply.statusCode = 400;
        throw new Error('Id is incorrect');
      } else {
        const updatedProfile = await fastify.db.profiles.change(
          id,
          request.body
        );
        return updatedProfile;
      }
    }
  );
};

export default plugin;
