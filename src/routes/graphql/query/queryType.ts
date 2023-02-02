import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { userType, profileType, postType, memberTypeType } from '../entities/entitiesTypes';
import {
  getAllUsers,
  getUser,
  getAllPosts,
  getPost,
  getAllProfiles,
  getProfile,
  getAllMemberTypes,
  getMemberType,
} from './resolvers';

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: getAllUsers,
    },
    user: {
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve: getUser,
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: getAllPosts,
    },
    post: {
      type: postType,
      args: { id: { type: GraphQLID } },
      resolve: getPost,
    },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: getAllProfiles,
    },
    profile: {
      type: profileType,
      args: { id: { type: GraphQLID } },
      resolve: getProfile,
    },
    memberTypes: {
      type: new GraphQLList(memberTypeType),
      resolve: getAllMemberTypes,
    },
    memberType: {
      type: memberTypeType,
      args: { id: { type: GraphQLString } },
      resolve: getMemberType,
    },
  },
});
