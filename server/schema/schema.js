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

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema
} = graphql

//Define Schema
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        kd: {type: GraphQLFloat}
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
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})