import { prismaClient } from "../../prisma/prisma";

export class VoteService {
  async toggleVote(userId: string, ideaId: string): Promise<boolean> {
    const exitingVote = await prismaClient.vote.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });

    if (exitingVote) {
      await prismaClient.vote.delete({
        where: {
          userId_ideaId: {
            userId,
            ideaId,
          },
        },
      });
    } else {
      await prismaClient.vote.create({
        data: {
          userId,
          ideaId,
        },
      });
    }

    return true;
  }

  async listVotesByIdea(ideaId: string) {
    return await prismaClient.vote.findMany({
      where: { ideaId },
    });
  }

  async countVotes(ideaId: string) {
    return await prismaClient.vote.count({
      where: { ideaId },
    });
  }
}
