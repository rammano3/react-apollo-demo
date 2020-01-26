const fetch = require("isomorphic-unfetch");
const { HttpLink } = require("@apollo/client");
const fs = require("fs");
const { printSchema } = require("graphql");
const { introspectSchema } = require("graphql-tools");

const fetchTypeDefs = async ({
  uri = "http://localhost:3000/graphql",
  typescript = true,
  path = `${process.cwd()}/typeDefs.${typescript ? "ts" : "js"}`
}) => {
  const link = new HttpLink({ uri, fetch });

  console.log("writing typeDefs to: ", path);

  fs.writeFileSync(
    path,
    `export const typeDefs = \`
${printSchema(await introspectSchema(link)).replace(/`/g, "\\`")}\``
  );
};

fetchTypeDefs({
  uri: "https://metaphysics-production.artsy.net/?",
  typescript: false,
  path: `${process.cwd()}/src/test/mocks/typeDefs.js`
});
