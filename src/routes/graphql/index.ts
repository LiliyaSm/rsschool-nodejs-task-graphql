import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphqlBodySchema } from './schema';
import { graphqlSchema } from './graphqlSchema';
import { graphql, parse } from 'graphql';
import * as depthLimit from 'graphql-depth-limit';
import { validate } from 'graphql/validation';
import { FastifyReply } from 'fastify';
import { getContext } from './loader';

const DEPTH_LIMIT = 6;

const isDepthValid = (query: string | undefined, reply: FastifyReply) => {
  const document = parse(query!);
  const validationErrors = validate(graphqlSchema, document, [
    depthLimit(DEPTH_LIMIT),
  ]);
  if (validationErrors.length > 0) {
    reply.statusCode = 200;
    reply.send({ errors: ['Depth limit exceeded'] });
    return false;
  }
  return true;
};

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async (request, reply) => {
      const { variables, query } = request.body;
      if (isDepthValid(query, reply)) {
        return await graphql({
          schema: graphqlSchema,
          source: String(query),
          variableValues: variables,
          contextValue: getContext(fastify),
        });
      }
    }
  );
};

export default plugin;
