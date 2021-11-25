import { Ctx, resolver } from "blitz"
import db, { prisma } from "db"
import { z } from "zod"
const { PrismaClient } = require("@prisma/client")

const LikePost = z.object({
  id: z.number(),
  // userId: z.number(),
})

export default resolver.pipe(
  resolver.zod(LikePost),
  resolver.authorize(),
  async ({ id }, ctx: Ctx) => {
    const userId = ctx.session!.userId!
    const post = await db.post.findFirst({
      where: { id: id },
      include: {
        _count: {
          select: {
            likedBy: true,
          },
        },
        likedBy: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!post) {
      throw new Error("Post not found")
    }

    if (post.likedBy) {
      return {
        numberOfLikesQuery: post?._count.likedBy,
        didILikeIt: post.likedBy.some((user) => user.id === userId) ? true : false,
      }
    }
    return { numberOfLikesQuery: post?._count.likedBy, didILikeIt: false }
  }
)
