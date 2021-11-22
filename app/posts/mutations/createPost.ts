import { resolver } from "blitz"
import db, { Post } from "db"
import { z } from "zod"
import { Ctx } from "blitz"

const CreatePost = z.object({
  tags: z.string(),
  image: z.string(),
  title: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreatePost),
  resolver.authorize(),
  async ({ tags, image, title }, ctx: Ctx) => {
    const authorId = ctx.session!.userId!

    try {
      const user = await db.user.findUnique({
        where: { id: authorId },
        select: { name: true },
      })
      const authorName = user!.name

      const post = await db.post.create({ data: { tags, image, title, authorId, authorName } })

      return post
    } catch (error) {
      console.log(error)
    }
  }
)
