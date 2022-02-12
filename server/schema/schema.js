const graphql = require('graphql')
var _ = require('lodash')
const User = require("../model/user")
const Post = require("../model/post")
const Hobby = require("../model/hobby")


//dummy DB
var userData = [
    {id: '1', name: 'Bond' , age: 78 , profession: "X profression"},
    {id: '2', name: 'Bond2' , age: 78 , profession: "X profression"},
    {id: '3', name: 'Bond3' , age: 78 , profession: "X profression"},
    {id: '4', name: 'Bond4' , age: 78 , profession: "X profression"},
    {id: '55', name: 'Bond5' , age: 78 , profession: "X profression"},
    {id: '6', name: 'Bond6' , age: 78 , profession: "X profression"},
    {id: '7', name: 'Bond7' , age: 78 , profession: "X profression"},
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
        profession: {type: GraphQLString},

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
                profession: {type: GraphQLString},
            },

            resolve(parent, args){
                let user = User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })
                return user.save();

            }
        },
        createPost: {
            type: PostType,
            args: {
                comment: {type: GraphQLString} ,
                userId: {type: GraphQLID},
            },

            resolve(parent, args){
                let post = Post({
                    comment: args.comment,
                    userId: args.userId,
                })
                return post.save();

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
                let hobby = Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                })
                return hobby.save();

            }
        },          
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})