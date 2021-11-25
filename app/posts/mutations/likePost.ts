import { Ctx, resolver } from "blitz"
import db, { prisma } from "db"
import { z } from "zod"
const { PrismaClient } = require("@prisma/client")

const LikePost = z.object({
  id: z.number(),
  like: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(LikePost),
  resolver.authorize(),
  async ({ id, like }, ctx: Ctx) => {
    const userId = ctx.session!.userId!

    const post = await db.post.update({
      where: { id: id },
      data: {
        likedBy: like ? { disconnect: { id: userId } } : { connect: { id: userId } },
      },
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

    if (post.likedBy) {
      return { ...post, didILikeIt: post.likedBy.some((user) => user.id === userId) ? true : false }
    }
    return { ...post, didILikeIt: false }
  }
)
