import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { Ctx } from "blitz"

const CreatePost = z.object({
  tags: z.string(),
  image: z.string(),
  title: z.string(),
})

// Singleton class that prevents duplicate posts. User can only post once per 10 seconds.
class UsersQueue {
  userIds: number[]
  static instance: UsersQueue
  constructor() {
    if (UsersQueue.instance instanceof UsersQueue) {
      return UsersQueue.instance
    } else {
      this.userIds = []
      Object.freeze(this)
      UsersQueue.instance = this
    }
  }

  add(userId) {
    this.userIds.push(userId)
    setTimeout(() => {
      this.pop()
    }, 10000)
  }

  get() {
    return this.userIds
  }
  pop() {
    return this.userIds.pop()
  }
}
// End Singleton class
// Initialize the singleton class
new UsersQueue()

export default resolver.pipe(
  resolver.zod(CreatePost),
  resolver.authorize(),
  async ({ tags, image, title }, ctx: Ctx) => {
    const authorId = ctx.session!.userId!

    // Check if user has already posted in the last 10 seconds
    if (UsersQueue.instance.get().includes(authorId)) {
      throw new Error("You can't create a post in 10 seconds")
    } else {
      UsersQueue.instance.add(authorId)
      try {
        const user = await db.user.findUnique({
          where: { id: authorId },
          select: { name: true },
        })
        const authorName = user!.name

        if (image === "") {
          throw new Error("Image is required. Provided empty string")
        }

        const post = await db.post.create({ data: { tags, image, title, authorId, authorName } })

        return post
      } catch (error) {
        console.log(error)
      }
    }
  }
)
