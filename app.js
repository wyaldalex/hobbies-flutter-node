const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql');

const schema = require('./server/schema/schema')


const app = express();
const port = process.env.PORT || 4000

app.use('/graphql', graphqlHTTP({    
    graphiql: true,
    schema: schema
}))


mongoose.connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@clusterflutterapps.gz6om.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`, 
).then(() => {

    app.listen({port: port},() => {
        console.log('Listening for requests on ' + port)
    
    })

}).catch((e) => console.log("Error:::" +e))



