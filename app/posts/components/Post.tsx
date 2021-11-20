import { Image } from "blitz"
import React from "react"
import styles from "../styles/Post.module.scss"

interface PostData {
  tags: string | null
  image: string | null
  authorName: string | null
  createdAt: Date | null
}
const defaultPostData: PostData = {
  tags: "palceholder tags",
  image:
    "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  authorName: "Author Name Placeholder",
  createdAt: new Date(),
}

function Post(props: { post: PostData }) {
  const { tags, image, authorName, createdAt }: PostData = props.post || defaultPostData
  console.log(createdAt)

  return (
    <div className={styles.postContainer}>
      <div className={styles.postImage}>
        <span>{authorName}</span>
        {tags?.split(" ").map((tag) => `#${tag}`)}
        <img src={image!} alt="post image" />
        {/* <span>{createdAt}</span> */}
      </div>
    </div>
  )
}

export default Post
