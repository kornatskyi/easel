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
    // <div className={styles.postContainer}>
    //   <div className={styles.postImage}>
    //     <span>{authorName}</span>
    //     {tags?.split(" ").map((tag) => `#${tag}`)}
    //     <img src={image!} alt="post image" />
    //     {/* <span>{createdAt}</span> */}
    //   </div>
    // </div>
    <div className="py-5">
      <div className="card">
        <header className="card-heaer">
          <p className="card-header-title">{authorName}</p>
        </header>
        <div className="card-image">
          <figure className="image is-16by9">
            <img src={image!} alt="post image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">{tags?.split(" ").map((tag) => ` #${tag}`)}</div>
        </div>
      </div>
    </div>
  )
}

export default Post
