const express = require('express')
const { graphqlHTTP } = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({    
    graphiql: true
}))

//ada
app.listen(4000,() => {
    console.log('Listening for requests on 4000')

})

