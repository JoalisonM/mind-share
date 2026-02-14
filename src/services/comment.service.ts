import { prismaClient } from "../../prisma/prisma";
import { CreateCommentInput } from "../dtos/input/comment.input";

export class CommentService {
  async listCommentsByIdea(ideaId: string) {
    return await prismaClient.comment.findMany({
      where: { ideaId },
    });
  }

  async createComment(
    ideaId: string,
    authorId: string,
    data: CreateCommentInput,
  ) {
    const findIdea = await prismaClient.idea.findUnique({
      where: { id: ideaId },
    });

    if (!findIdea) throw new Error("Idea não encontrada");

    return await prismaClient.comment.create({
      data: {
        ideaId,
        authorId,
        content: data.content,
      },
    });
  }
}
