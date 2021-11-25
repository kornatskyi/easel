import { Image, Link, Routes, useMutation, useQuery } from "blitz"
import moment from "moment"
import React, { useState } from "react"
import { FaFileDownload, FaHeart } from "react-icons/fa"
import likePost from "../mutations/likePost"
import getNumberOfLikes from "../queries/getNumberOfLikes"

interface PostData {
  tags: string | null
  title: string
  image: string | null
  authorName: string | null
  createdAt: Date | null
  id: number
}

interface LikePostProps {
  id: number | string
  like: boolean
  userId: number
}

const defaultPostData: PostData = {
  tags: "palceholder tags",
  title: "placeholder title",
  image:
    "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  authorName: "Author Name Placeholder",
  createdAt: new Date(),
  id: 1,
}

function Post(props: { post: PostData }) {
  const { tags, image, authorName, createdAt, title, id }: PostData = props.post || defaultPostData
  const [{ numberOfLikesQuery, didILikeIt }] = useQuery(getNumberOfLikes, { id: id })
  const [numberOfLikes, setNumberOfLikes] = useState(numberOfLikesQuery || 0)
  const [like, setLike] = useState(didILikeIt)

  const [likePostMutation] = useMutation(likePost)

  const handleLike = async (e) => {
    e.preventDefault()
    const post = await likePostMutation({
      id: id,
      like: like,
    })
    //setting updated number of likes
    setNumberOfLikes(post._count.likedBy)
    setLike(post.didILikeIt)
  }

  return (
    <div className="py-5">
      <div className="card">
        <header className="card-header ">
          <div className="media p-3 is-align-items-center is-flex">
            <div className="media-left"></div>
            <div className="media-content is-flex is-flex-direction-column">
              <span className="">{authorName}</span>
              <span>
                {tags?.split(" ").map((tag, i) => (
                  <a key={i}>#{tag}</a>
                ))}
              </span>
              <span className="has-text-grey-light is-size-7">{moment(createdAt).fromNow()}</span>
            </div>
          </div>
        </header>

        <Link href={Routes.ShowPostPage({ postId: id })}>
          <a>
            <div className="column">
              <div className="card-image">
                <figure className="image is-16by9 is-align-self-end">
                  <Image draggable="false" src={image!} alt="post image" layout="fill" />
                </figure>
              </div>
            </div>
          </a>
        </Link>
        <div className="card-footer is-flex ">
          <div className="is-flex is-align-items-center card-footer-item">
            <a href={image!} className=" is-primary " onClick={handleLike}>
              <FaHeart className={like ? "has-text-primary" : "has-text-grey-light"} />
              <span className="mx-1">{numberOfLikes}</span>
            </a>
          </div>

          <span className="card-footer-item  is-size-5 has-text-primary has-text-weight-semibold ">
            {title}
          </span>

          <div className="is-flex is-align-items-center card-footer-item">
            <a download="FILENAME.png" href={image!} className=" is-primary ">
              <FaFileDownload />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
