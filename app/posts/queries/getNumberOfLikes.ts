import { Ctx, resolver } from "blitz"
import db, { prisma } from "db"
import { z } from "zod"
const { PrismaClient } = require("@prisma/client")

const LikePost = z.object({
  id: z.number(),
  // userId: z.number(),
})

export default resolver.pipe(resolver.zod(LikePost), async ({ id }, ctx: Ctx) => {
  const userId = ctx.session!.userId!
  const post = await db.post.findFirst({
    where: { id: id },
    // @ts-ignore
    include: {
      // @ts-ignore
      _count: {
        // @ts-ignore
        select: {
          // @ts-ignore
          likedBy: true,
        },
      },
      // @ts-ignore
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
  // @ts-ignore
  if (post.likedBy) {
    return {
      // @ts-ignore
      numberOfLikesQuery: post?._count.likedBy,
      // @ts-ignore
      didILikeIt: post.likedBy.some((user) => user.id === userId) ? true : false,
    }
  }
  // @ts-ignore
  return { numberOfLikesQuery: post?._count.likedBy, didILikeIt: false }
})
