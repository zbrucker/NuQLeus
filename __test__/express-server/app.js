const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();
app.use(cors());

/** Initiate graphQL route **/ 

app.use('/graphql', graphqlHTTP({
  schema, 
  graphiql: true
}));

/** Connect to MongoDB **/ 

mongoose.connect('mongodb+srv://jenny:Codesmith41@cluster0.nbdhe.mongodb.net/sample_mflix?retryWrites=true&w=majority', {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


/** Start server on PORT 4000 **/ 

app.listen(4000, () => {
  console.log('Listening on port 4000'); 
});


