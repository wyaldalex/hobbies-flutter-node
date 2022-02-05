const graphql = require('graphql')
var _ = require('lodash')


//dummy DB
var userData = [
    {id: '1', name: 'Bond' , age: 78 , kd: 15},
    {id: '2', name: 'Bond2' , age: 78 , kd: 1},
    {id: '3', name: 'Bond3' , age: 78 , kd: 15.2},
    {id: '4', name: 'Bond4' , age: 78 , kd: 0.4},
    {id: '55', name: 'Bond5' , age: 78 , kd: 1.33},
    {id: '6', name: 'Bond6' , age: 78 , kd: 1.3},
    {id: '7', name: 'Bond7' , age: 78 , kd: 14},
] 

var hobbyData = [
    {id: '1', title: 'video games' , description: 'fun' ,  userId: '1' },
    {id: '2', title: 'video games 2' , description: 'fun 2' ,  userId: '1'},
    {id: '3', title: 'video games 3' , description: 'fun 3' , userId: '55' },
    {id: '4', title: 'video games 4' , description: 'fun 4'  , userId: '55'},
]

var postData = [
    {id: '1', comment: 'video games comment' , userId: '1' },
    {id: '2', comment: 'video games comment2 2' , userId: '55' }
]   

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList
} = graphql

//Define Schema
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        kd: {type: GraphQLFloat},

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return _.filter(postData, {userId: parent.id})

            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args){
                return _.filter(hobbyData, {userId: parent.id})

            }
        }
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobbies users do',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
                
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Posts users do',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString} ,
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }    
    })
})

//Define RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args){
                return _.find(userData, {id: args.id})

                //we resolve with data
                //get and return data from datasource

            }
        },
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
                return _.find(hobbyData, {id: args.id})

                //we resolve with data
                //get and return data from datasource

            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args){
                return hobbyData

                //we resolve with data
                //get and return data from datasource

            }
        },
        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
                return _.find(postData, {id: args.id})

                //we resolve with data
                //get and return data from datasource

            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return postData

                //we resolve with data
                //get and return data from datasource

            }
        },                 
    }
})

//Const Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                kd: {type: GraphQLFloat},
            },

            resolve(parent, args){
                let user = {
                    name: args.name,
                    age: args.age,
                    kid: args.kd
                }
                return user;

            }
        },
        createPost: {
            type: PostType,
            args: {
                comment: {type: GraphQLString} ,
                userId: {type: GraphQLID},
            },

            resolve(parent, args){
                let post = {
                    comment: args.comment,
                    userId: args.userId,
                }
                return post;

            }
        },        
        createHobby: {
            type: HobbyType,
            args: {
               // id: {type: GraphQLID},
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID},
            },

            resolve(parent, args){
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                }
                return hobby;

            }
        },          
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})