## Assignment: Graphql

Clone this repo

Install the dependencies:

```
npm install
```

## Run test to check restful endpoints - 100%
```
npm run test
```


## Graphql endpoints logic
   Can be tested using POST request on endpoint http://localhost:3000/graphql

   Get gql requests examples:

   **!NB! ids numbers are provided as an example, real id numbers should be taken from the database!**

   2.1. Get users, profiles, posts, memberTypes - 4 operations in one query.

```
query {
  users {
      id
      email
      firstName
      lastName
      subscribedToUserIds
  }
  profiles {
        id
        avatar
        sex
        birthday
        country
        street
        city
        userId
        memberTypeId
  }
  posts {
      id
      userId
      title
      content
  }
  memberTypes {
      id
      discount
      monthPostsLimit
  }
}
```

2.2. Get user, profile, post, memberType by id - 4 operations in one query.

```
query($userId: ID!, $postId: ID!, $profileId: ID!, $memberTypeId: String!) {
  user(id: $userId) {
      id
      email
      firstName
      lastName
      subscribedToUserIds
  }
    post(id: $postId) {
     id
      userId
      title
      content
  }
  profile(id: $profileId) {
        id
        avatar
        sex
        birthday
        country
        street
        city
        userId
        memberTypeId
  }
  memberType(id: $memberTypeId) {
      id
      discount
      monthPostsLimit
  }
}
```

GraphQL variables:

```json
{
  "userId": "1428265e-a6bb-4c22-bccf-f478258fef08",
  "postId": "2428265e-a6bb-4c22-bccf-f478258fef08",
  "profileId": "3428265e-a6bb-4c22-bccf-f478258fef08",
  "memberTypeId": "business"
}
```

2.3. Get users with their posts, profiles, memberTypes.

```
query {
  users {
      id
      firstName
      lastName
      posts{
        id
        title
        content
      }
      profile{
        id
        country
        street
      }
      memberType{
        id
        discount
        monthPostsLimit
    }
  }
}
```

2.4. Get user by id with his posts, profile, memberType.

```
query($id: ID!) {
  user(id: $id){
      id
      firstName
      lastName
      posts{
        id
        title
        content
      }
      profile{
        id
        country
        street
      }
      memberType{
        id
        discount
        monthPostsLimit
    }
  }
}
```

GraphQL variables:

```json
  {
    "id": "1428265e-a6bb-4c22-bccf-f478258fef08",
  }
```

2.5. Get users with their userSubscribedTo, profile.

```
query {
  users {
      id
      firstName
      lastName
      userSubscribedTo{
        id
        firstName
        lastName
          profile {
          id
          country
          street
          }
        }
      profile{
        id
        country
        street
    }
  }
}
```

2.6. Get user by id with his subscribedToUser, posts.

```
query($id: ID!) {
  user(id: $id){
      id
      firstName
      lastName
      posts{
        id
        title
        content
      }
      subscribedToUser{
        id
        firstName
        lastName
          posts{
            id
            title
            content
        }
    }
  }
}
```

GraphQL variables:

```json
  {
    "id": "1428265e-a6bb-4c22-bccf-f478258fef08",
  }
```

2.7. Get users with their userSubscribedTo, subscribedToUser (additionally for each user in userSubscribedTo, subscribedToUser add their userSubscribedTo, subscribedToUser).

```
query {
  users {
      id
      firstName
      lastName
      userSubscribedTo {
          id
          firstName
          lastName
          subscribedToUser {
            id
            firstName
            lastName
          }
          userSubscribedTo {
            id
            firstName
            lastName
          }
      }
      subscribedToUser {
          id
          firstName
          lastName
          subscribedToUser {
            id
            firstName
            lastName
          }
          userSubscribedTo {
            id
            firstName
            lastName
          }
      }
  }
}
```

Create gql requests examples:

2.8. Create user

```
  mutation($user: NewUserInput!) {
      createUser(input: $user) {
        id
        firstName
        lastName
        email
      }
    }

```

GraphQL variables:

```json
{
  "user": {
    "firstName": "kot",
    "lastName": "smetanov",
    "email": "cat@gmail.com"
  }
}
```

2.9. Create profile.

```
  mutation($profile: NewProfileInput!) {
      createProfile(input: $profile) {
        id
        avatar
        sex
        birthday
        country
        street
        city
        userId
        memberTypeId
     }
   }
```

GraphQL variables:

```json
{
  "profile": {
    "avatar": "cat.jpg",
    "sex": "m",
    "birthday": 12345,
    "country": "Australia",
    "street": "Cats street",
    "city": "Sydney",
    "userId": "6428265e-a6bb-4c22-bccf-f478258fef08",
    "memberTypeId": "business"
  }
}
```

2.10. Create post.

```
mutation($post: NewPostInput!) {
    createPost(input: $post) {
    id
    userId
    title
    content
  }
}
```

```json
{
  "post": {
    "title": "Cats' life",
    "content": "myaaaauuuuu",
    "userId": "6428265e-a6bb-4c22-bccf-f478258fef08"
  }
}
```

Update gql requests examples:

2.12. Update user (all fields are optional)

```
 mutation($id: ID!, $user: UpdatedUserInput!) {
      updateUser(id: $id, input: $user) {
        id
        firstName
        lastName
        email
      }
    }

```

GraphQL variables:

```json
{
  "id": "6428265e-a6bb-4c22-bccf-f478258fef08",
  "user": {
    "firstName": "ryzhik(updated!)",
    "lastName": "koteev(updated!)",
    "email": "ryzhik@gmail.com(updated!)"
  }
}
```

2.13 Update profile (all fields are optional)

```
mutation($id: ID!, $profile: UpdatedProfileInput!) {
  updateProfile(id: $id, input: $profile) {
    id
    avatar
    sex
    birthday
    country
    street
    city
    userId
    memberTypeId
  }
}
```

GraphQL variables:

```json
{
  "id": "6428265e-a6bb-4c22-bccf-f478258fef08",
  "profile": {
    "avatar": "updatedImage.jpg(updated!)",
    "country": "Canada(updated!)"
  }
}
```

2.14. Update post (all fields are optional)

```
mutation($id: ID!, $post: UpdatedPostInput!) {
  updatePost(id: $id, input: $post) {
    id
    userId
    title
    content
  }
}
```

GraphQL variables:

```json
{
  "id": "6428265e-a6bb-4c22-bccf-f478258fef08",
  "post": {
    "content": "New content(updated!)"
  }
}
```

2.15. Update memberType (all fields are optional) 

```
mutation($id: String!, $memberType: UpdatedMemberTypeInput!) {
  updateMemberType(id: $id, input: $memberType) {
      id
      discount
      monthPostsLimit
  }
}
```

GraphQL variables:

```json
{
  "id": "business",
  "memberType": {
    "discount": "99"
  }
}

```

2.16. Subscribe to 
The input contains the **subscriber** data that is similar to REST request.

```
mutation($id: String!, $subscriber: SubscriberInput!) {
  subscribeUserTo(id: $id, input: $subscriber) {
      id
      email
      firstName
      lastName
      subscribedToUserIds
  }
}
```

GraphQL variables:

```json
{
  "id": "6428265e-a6bb-4c22-bccf-f478258fef08",
  "subscriber": {
    "id": "1118265e-a6bb-4c22-bccf-f478258fef08"
  }
}
```

Unsubscribe from
The input contains the **unsubscribed user** id that is similar to REST request.

```
mutation($id: String!, $unsubscribed: SubscriberInput!) {
  unsubscribeUser(id: $id, input: $unsubscribed) {
      id
      email
      firstName
      lastName
      subscribedToUserIds
  }
}
```

```json
{
  "id": "6428265e-a6bb-4c22-bccf-f478258fef08",
  "unsubscribed": {
    "id": "1118265e-a6bb-4c22-bccf-f478258fef08"
  }
}
```

## N+1 graphql problem solution with dataloader package:
Inside '.\src\routes\graphql\loader.ts' there is a createLoader function for loader implementation:

[Link](https://github.com/LiliyaSm/rsschool-nodejs-task-graphql/blob/238e21095e1ef21618972b80e09ab46cff561aed/src/routes/graphql/loader.ts#L19)

I've applied it to context here: 

[Link](https://github.com/LiliyaSm/rsschool-nodejs-task-graphql/blob/238e21095e1ef21618972b80e09ab46cff561aed/src/routes/graphql/index.ts#L42)

Calls in resolvers: 

[Link](https://github.com/LiliyaSm/rsschool-nodejs-task-graphql/blob/238e21095e1ef21618972b80e09ab46cff561aed/src/routes/graphql/entities/resolvers.ts#L58) 

[Link](https://github.com/LiliyaSm/rsschool-nodejs-task-graphql/blob/238e21095e1ef21618972b80e09ab46cff561aed/src/routes/graphql/entities/resolvers.ts#L69)

[Link](https://github.com/nosbog/rsschool-nodejs-task-graphql/blob/fad94f7599a43333d497fadaa1ef03dbb7f090eb/src/routes/graphql/entities/resolvers.ts#L28)

[Link](https://github.com/nosbog/rsschool-nodejs-task-graphql/blob/fad94f7599a43333d497fadaa1ef03dbb7f090eb/src/routes/graphql/entities/resolvers.ts#L20)

[Link](https://github.com/nosbog/rsschool-nodejs-task-graphql/blob/fad94f7599a43333d497fadaa1ef03dbb7f090eb/src/routes/graphql/entities/resolvers.ts#L36)

Before using data loader findMany function there were many calls:

![](beforeLoader.jpg)

After using data loader findMany function has only one call:

![](afterLoder.jpg)

## Depth validation
Inside '.\src\routes\graphql\index.ts' there is a isDepthValid function for depth validation. 

[Implementation](https://github.com/LiliyaSm/rsschool-nodejs-task-graphql/blob/7c5c6c4c080b2e370046b9fdc04451fd311b5d09/src/routes/graphql/index.ts#L11)

[Link to place where it was used](https://github.com/LiliyaSm/rsschool-nodejs-task-graphql/blob/7c5c6c4c080b2e370046b9fdc04451fd311b5d09/src/routes/graphql/index.ts#L36)


### Tasks:

1. Add logic to the restful endpoints (users, posts, profiles, member-types folders in ./src/routes).  
   1.1. npm run test - 100%
2. Add logic to the graphql endpoint (graphql folder in ./src/routes).  
   Constraints and logic for gql queries should be done based on restful implementation.  
   For each subtask provide an example of POST body in the PR.  
   All dynamic values should be sent via "variables" field.  
   If the properties of the entity are not specified, then return the id of it.  
   `userSubscribedTo` - these are users that the current user is following.  
   `subscribedToUser` - these are users who are following the current user.

   - Get gql requests:  
     2.1. Get users, profiles, posts, memberTypes - 4 operations in one query.  
     2.2. Get user, profile, post, memberType by id - 4 operations in one query.  
     2.3. Get users with their posts, profiles, memberTypes.  
     2.4. Get user by id with his posts, profile, memberType.  
     2.5. Get users with their `userSubscribedTo`, profile.  
     2.6. Get user by id with his `subscribedToUser`, posts.  
     2.7. Get users with their `userSubscribedTo`, `subscribedToUser` (additionally for each user in `userSubscribedTo`, `subscribedToUser` add their `userSubscribedTo`, `subscribedToUser`).
   - Create gql requests:  
     2.8. Create user.  
     2.9. Create profile.  
     2.10. Create post.  
     2.11. [InputObjectType](https://graphql.org/graphql-js/type/#graphqlinputobjecttype) for DTOs.
   - Update gql requests:  
     2.12. Update user.  
     2.13. Update profile.  
     2.14. Update post.  
     2.15. Update memberType.  
     2.16. Subscribe to; unsubscribe from.  
     2.17. [InputObjectType](https://graphql.org/graphql-js/type/#graphqlinputobjecttype) for DTOs.

3. Solve `n+1` graphql problem with [dataloader](https://www.npmjs.com/package/dataloader) package in all places where it should be used.  
   You can use only one "findMany" call per loader to consider this task completed.  
   It's ok to leave the use of the dataloader even if only one entity was requested. But additionally (no extra score) you can optimize the behavior for such cases => +1 db call is allowed per loader.  
   3.1. List where the dataloader was used with links to the lines of code (creation in gql context and call in resolver).
4. Limit the complexity of the graphql queries by their depth with [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) package.  
   4.1. Provide a link to the line of code where it was used.  
   4.2. Specify a POST body of gql query that ends with an error due to the operation of the rule. Request result should be with `errors` field (and with or without `data:null`) describing the error.

### Description:

All dependencies to complete this task are already installed.  
You are free to install new dependencies as long as you use them.  
App template was made with fastify, but you don't need to know much about fastify to get the tasks done.  
All templates for restful endpoints are placed, just fill in the logic for each of them.  
Use the "db" property of the "fastify" object as a database access methods ("db" is an instance of the DB class => ./src/utils/DB/DB.ts).  
Body, params have fixed structure for each restful endpoint due to jsonSchema (schema.ts files near index.ts).

### Description for the 1 task:

If the requested entity is missing - send 404 http code.  
If operation cannot be performed because of the client input - send 400 http code.  
You can use methods of "reply" to set http code or throw an [http error](https://github.com/fastify/fastify-sensible#fastifyhttperrors).  
If operation is successfully completed, then return an entity or array of entities from http handler (fastify will stringify object/array and will send it).

Relation fields are only stored in dependent/child entities. E.g. profile stores "userId" field.  
You are also responsible for verifying that the relations are real. E.g. "userId" belongs to the real user.  
So when you delete dependent entity, you automatically delete relations with its parents.  
But when you delete parent entity, you need to delete relations from child entities yourself to keep the data relevant.  
(In the next rss-school task, you will use a full-fledged database that also can automatically remove child entities when the parent is deleted, verify keys ownership and instead of arrays for storing keys, you will use additional "join" tables)

To determine that all your restful logic works correctly => run the script "npm run test".  
But be careful because these tests are integration (E.g. to test "delete" logic => it creates the entity via a "create" endpoint).

### Description for the 2 task:

You are free to create your own gql environment as long as you use predefined graphql endpoint (./src/routes/graphql/index.ts).  
(or stick to the [default code-first](https://github.dev/graphql/graphql-js/blob/ffa18e9de0ae630d7e5f264f72c94d497c70016b/src/__tests__/starWarsSchema.ts))

### Description for the 3 task:

If you have chosen a non-default gql environment, then the connection of some functionality may differ, be sure to report this in the PR.

### Description for the 4 task:

If you have chosen a non-default gql environment, then the connection of some functionality may differ, be sure to report this in the PR.  
Limit the complexity of the graphql queries by their depth with "graphql-depth-limit" package.  
E.g. User can refer to other users via properties `userSubscribedTo`, `subscribedToUser` and users within them can also have `userSubscribedTo`, `subscribedToUser` and so on.  
Your task is to add a new rule (created by "graphql-depth-limit") in [validation](https://graphql.org/graphql-js/validation/) to limit such nesting to (for example) 6 levels max.
