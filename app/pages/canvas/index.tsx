import React, { useRef, useState } from "react"
import KonvaBoard from "app/canvas/components/KonvaBoard"
import styles from "../../canvas/styles/canvaspage.module.scss"
import { Image, Routes, useMutation, useRouter } from "blitz"
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
      router.push(Routes.ShowPostPage({ postId: post.id }))
    } catch (error: any) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <div className={styles.canvasPage}>
      <h1>Canvas page</h1>
      <Form
        {...props}
        onSubmit={(values) => {
          handlePublish({ tags: values.tags, image: exportedImage })
        }}
      >
        <LabeledTextField name="tags" label="Tags" placeholder="tags" />

        <KonvaBoard publishButton={publishButton} setExportedImage={setExportedImage} />
        <button ref={publishButton} className={styles.publishButton}>
          Publish
        </button>
      </Form>
    </div>
  )
}

CanvasPage.propTypes = {}

export default CanvasPage
function createPostMutation(values: any) {
  throw new Error("Function not implemented.")
}
