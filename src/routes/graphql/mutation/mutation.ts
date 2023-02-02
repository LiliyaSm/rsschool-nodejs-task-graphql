import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { userType, profileType, postType, memberTypeType } from '../entities/entitiesTypes';
import {
  createUser,
  createProfile,
  createPost,
  updateUser,
  updateProfile,
  updatePost,
  updateMemberType,
  subscribeUserTo,
  unsubscribeUser
} from './resolvers';
import {
  newUserInputType,
  newProfileInputType,
  newPostInputType,
  updatedUserInputType,
  updatedProfileInputType,
  updatedPostInputType,
  updatedMemberTypeInputType,
  subscriberInputType
} from './inputTypes';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      args: { input: { type: newUserInputType } },
      resolve: createUser,
    },
    createProfile: {
      type: profileType,
      args: { input: { type: newProfileInputType } },
      resolve: createProfile,
    },
    createPost: {
      type: postType,
      args: { input: { type: newPostInputType } },
      resolve: createPost,
    },
    updateUser: {
      type: userType,
      args: {
        id: { type: GraphQLID },
        input: { type: updatedUserInputType },
      },
      resolve: updateUser,
    },
    updateProfile: {
      type: profileType,
      args: {
        id: { type: GraphQLID },
        input: { type: updatedProfileInputType },
      },
      resolve: updateProfile,
    },
    updatePost: {
      type: postType,
      args: {
        id: { type: GraphQLID },
        input: { type: updatedPostInputType },
      },
      resolve: updatePost,
    },
    updateMemberType: {
      type: memberTypeType,
      args: {
        id: { type: GraphQLString },
        input: { type: updatedMemberTypeInputType },
      },
      resolve: updateMemberType,
    },
    subscribeUserTo: {
      type: userType,
      args: {
        id: { type: GraphQLString },
        input: { type: subscriberInputType },
      },
      resolve: subscribeUserTo,
    },
    unsubscribeUser: {
      type: userType,
      args: {
        id: { type: GraphQLString },
        input: { type: subscriberInputType },
      },
      resolve: unsubscribeUser,
    },
  },
});
