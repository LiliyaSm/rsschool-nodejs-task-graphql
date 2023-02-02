import { GraphQLSchema } from 'graphql';
import { queryType } from './query/queryType';
import { mutationType } from './mutation/mutation';

export const graphqlSchema = new GraphQLSchema({
  query: queryType,
  // types: [],
  mutation: mutationType,
});
