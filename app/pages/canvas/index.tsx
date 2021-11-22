import React, { useRef, useState } from "react"
import KonvaBoard from "app/canvas/components/KonvaBoard"
import styles from "../../canvas/styles/canvaspage.module.scss"
import { Image, Link, Routes, useMutation, useRouter } from "blitz"
import { FORM_ERROR } from "final-form"
import createPost from "app/posts/mutations/createPost"
import Form from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"

type PostValues = {
  tags: string
  image: string
}

function CanvasPage(props) {
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)

  const [exportedImage, setExportedImage] = useState<string>("")
  const publishButton = useRef(null)

  const handlePublish = async (values: PostValues) => {
    try {
      const post = await createPostMutation(values)
      router.push(Routes.PostsPage())
    } catch (error: any) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <div className="columns is-centered mgt-medium ">
      <div className="column is-three-quarters content is-centered">
        <div className="columns is-centered mt-4 is-justify-content-space-between px-6  is-flex	">
          <Link href={Routes.Home()}>
            <a className="is-align-self-center is-size-4">Home</a>
          </Link>
          <b className="has-text-primary is-size-1 is-align-self-center	">Canvas</b>
          <Link href={Routes.PostsPage()}>
            <a className="is-align-self-center		is-size-4">Posts</a>
          </Link>
        </div>
        <Form
          {...props}
          onSubmit={(values) => {
            handlePublish({ tags: values.tags, image: exportedImage })
          }}
        >
          <KonvaBoard publishButton={publishButton} setExportedImage={setExportedImage} />
          <div className="columns">
            <LabeledTextField label="Tags" name="tags" placeholder="Tags" />
            <LabeledTextField label="Title" name="title" placeholder="Title" />
          </div>
          <button ref={publishButton} className="button is-primary">
            Publish
          </button>
        </Form>
      </div>
    </div>
  )
}

CanvasPage.propTypes = {}

export default CanvasPage
