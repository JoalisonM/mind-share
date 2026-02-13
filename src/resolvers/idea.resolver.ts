import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { IdeaService } from "../services/idea.service";
import { IdeaModel } from "../models/idea.model";
import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "../../generated/prisma/client";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {
  private ideaService = new IdeaService();
  private userService = new UserService();

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg("data", () => CreateIdeaInput) data: CreateIdeaInput,
    @GqlUser() user: User,
  ): Promise<IdeaModel> {
    return this.ideaService.createIdea(data, user.id);
  }

  @Mutation(() => IdeaModel)
  async updateIdea(
    @Arg("data", () => UpdateIdeaInput) data: UpdateIdeaInput,
    @Arg("id", () => String) id: string,
  ): Promise<IdeaModel> {
    return this.ideaService.updateIdea(id, data);
  }

  @Mutation(() => Boolean)
  async deleteIdea(@Arg("id", () => String) id: string): Promise<Boolean> {
    await this.ideaService.deleteIdea(id);

    return true;
  }

  @Query(() => [IdeaModel])
  async listIdeas(): Promise<IdeaModel[]> {
    return this.ideaService.listIdeas();
  }

  @FieldResolver(() => UserModel)
  async author(@Root() idea: IdeaModel): Promise<UserModel> {
    return await this.userService.findUser(idea.authorId);
  }
}
