import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

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
        // @ts-ignore
        likedBy: like ? { disconnect: { id: userId } } : { connect: { id: userId } },
      },
      // @ts-ignore
      include: {
        // @ts-ignore
        _count: {
          // @ts-ignore
          select: {
            likedBy: true,
          },
        },
        // @ts-ignore
        likedBy: {
          // @ts-ignore
          select: {
            id: true,
          },
        },
      },
    })
    // @ts-ignore
    if (post.likedBy) {
      return {
        // @ts-ignore
        countedNumberOfLikes: post._count.likedBy,
        // @ts-ignore
        didILikeIt: post.likedBy.some((user) => user.id === userId) ? true : false,
      }
    }
    // @ts-ignore
    return { countedNumberOfLikes: post._count.likedBy, didILikeIt: false }
  }
)
