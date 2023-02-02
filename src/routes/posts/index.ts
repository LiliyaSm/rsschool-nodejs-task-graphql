import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createPostBodySchema, changePostBodySchema } from './schema';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (): Promise<PostEntity[]> {
    return await fastify.db.posts.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const post = await fastify.db.posts.findOne({
        key: 'id',
        equals: request.params.id,
      });
      if (!post) {
        reply.statusCode = 404;
        throw new Error('Post not found!');
      } else {
        return post;
      }
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      return await fastify.db.posts.create(request.body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const id = request.params.id;
      const post = await fastify.db.posts.findOne({ key: 'id', equals: id });
      if (!post) {
        reply.statusCode = 400;
        throw new Error('Id is incorrect');
      } else {
        return await fastify.db.posts.delete(id);
      }
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changePostBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const id = request.params.id;
      const post = await fastify.db.posts.findOne({ key: 'id', equals: id });
      if (!post) {
        reply.statusCode = 400;
        throw new Error('Id is incorrect');
      } else {
        const updatedPost = await fastify.db.posts.change(id, request.body);
        return updatedPost;
      }
    }
  );
};

export default plugin;
