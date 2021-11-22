import { resolver } from "blitz"
import db, { Post } from "db"
import { z } from "zod"
import { Ctx } from "blitz"

const CreatePost = z.object({
  tags: z.string(),
  image: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreatePost),
  resolver.authorize(),
  async (input: any, ctx: Ctx) => {
    const authorId = ctx.session!.userId!
    // get user email from session
    const user = await db.user.findUnique({
      where: { id: authorId },
      select: { name: true },
    })
    const authorName = user?.name

    const post = await db.post.create({ data: { ...input, authorId, authorName } })

    return post
  }
)
