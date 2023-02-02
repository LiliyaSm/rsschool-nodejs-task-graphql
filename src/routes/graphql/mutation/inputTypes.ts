import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

export const newUserInputType = new GraphQLInputObjectType({
  name: 'NewUserInput',
  fields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const newProfileInputType = new GraphQLInputObjectType({
  name: 'NewProfileInput',
  fields: {
    avatar: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: new GraphQLNonNull(GraphQLInt) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const newPostInputType = new GraphQLInputObjectType({
  name: 'NewPostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
});

export const updatedUserInputType = new GraphQLInputObjectType({
  name: 'UpdatedUserInput',
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

export const updatedProfileInputType = new GraphQLInputObjectType({
  name: 'UpdatedProfileInput',
  fields: {
    avatar: { type: GraphQLString },
    sex: { type: GraphQLString },
    birthday: { type: GraphQLInt },
    country: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    memberTypeId: { type: GraphQLString },
  },
});

export const updatedPostInputType = new GraphQLInputObjectType({
  name: 'UpdatedPostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLID },
  },
});

export const updatedMemberTypeInputType = new GraphQLInputObjectType({
  name: 'UpdatedMemberTypeInput',
  fields: {
    discount: { type: GraphQLString },
    monthPostsLimit: { type: GraphQLString },
  },
});

export const subscriberInputType = new GraphQLInputObjectType({
  name: 'SubscriberInput',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
});
 
  