import { Image, Link, Routes, useMutation, useQuery } from "blitz"
import moment from "moment"
import React, { useEffect, useState } from "react"
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
            <figure className="image is-48x48  ">
              <Image
                className="is-rounded"
                src={
                  "data:image/jpeg;base64,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"
                }
                layout="fill"
                alt="Placeholder image"
              />
            </figure>
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
