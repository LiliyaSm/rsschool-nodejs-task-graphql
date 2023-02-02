import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import {
  getAllProfiles,
  getProfileByUserId,
  getAllPostsByUserId,
  getMemberType,
  getAllMemberTypes,
  getUserSubscribedTo,
  getSubscribedToUser,
} from './resolvers';

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    avatar: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: new GraphQLNonNull(GraphQLInt) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

export const memberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    discount: { type: new GraphQLNonNull(GraphQLInt) },
    monthPostsLimit: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

export const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    subscribedToUserIds: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString))
      ),
    },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: getAllProfiles,
    },
    profile: {
      type: profileType,
      resolve: getProfileByUserId,
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: getAllPostsByUserId,
    },
    memberType: {
      type: memberTypeType,
      resolve: getMemberType,
    },
    memberTypes: {
      type: new GraphQLList(memberTypeType),
      resolve: getAllMemberTypes,
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: getUserSubscribedTo,
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: getSubscribedToUser,
    },
  }),
});
