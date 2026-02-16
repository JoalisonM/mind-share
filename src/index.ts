import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/auth.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { buildContext } from "./graphql/context";
import { IdeaResolver } from "./resolvers/idea.resolver";
import { CommentResolver } from "./resolvers/comment.resolver";
import { VoteResolver } from "./resolvers/vote.resolver";

async function main() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      IdeaResolver,
      CommentResolver,
      VoteResolver,
    ],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({ schema });

  await server.start();

  app.use(
    cors({
      origin: "*",
      credentials: true,
    }),
  );

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
