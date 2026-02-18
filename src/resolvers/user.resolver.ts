import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input";
import { GraphqlContext } from "../graphql/context";
import { User } from "../../generated/prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private userService = new UserService();

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.findUser(id);
  }

  @Query(() => [UserModel])
  async listUsers(): Promise<UserModel[]> {
    return this.userService.listUsers();
  }

  @Mutation(() => UserModel)
  async createUser(
    @Arg("data", () => CreateUserInput) data: CreateUserInput,
  ): Promise<UserModel> {
    return this.userService.createUser(data);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @Arg("id", () => String) id: string,
  ): Promise<UserModel> {
    return this.userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id", () => String) id: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    if (user.id === id) throw new Error("Você não pode excluir a si mesmo.");

    return this.userService.deleteUser(id);
  }
}
