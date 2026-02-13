import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/auth.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { buildContext } from "./graphql/context";
import { IdeaResolver } from "./resolvers/idea.resolver";

async function main() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver, IdeaResolver],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({ schema });

  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    }),
  );

  app.listen(
    {
      port: 3333,
    },
    () => {
      console.log("Servidor iniciado na porta 3333!");
    },
  );
}

main();
