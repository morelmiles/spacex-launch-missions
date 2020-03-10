const express = require("express");
const graphQlHttp = require("express-graphql");
const schema = require("./schema");
const app = express();

app.use(
  "/graphql",
  graphQlHttp({
    schema: schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
