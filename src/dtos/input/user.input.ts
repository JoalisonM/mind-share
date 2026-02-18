import { Field, InputType } from "type-graphql";
import { Role } from "../../../generated/prisma/enums";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => Role, { nullable: true })
  role?: Role;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => Role, { nullable: true })
  role?: Role;
}
