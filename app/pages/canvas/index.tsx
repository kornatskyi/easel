import React, { useRef, useState } from "react"
import KonvaBoard from "app/canvas/components/KonvaBoard"
import styles from "../../canvas/styles/canvaspage.module.scss"
import { Image, Link, Routes, useMutation, useRouter } from "blitz"
import { FORM_ERROR } from "final-form"
import createPost from "app/posts/mutations/createPost"
import Form from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import Layout from "app/core/layouts/Layout"
import { Title } from "app/auth/validations"

type PostValues = {
  tags: string
  image: string
  title: string
}

function CanvasPage(props) {
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)

  const [exportedImage, setExportedImage] = useState<string>("")
  const publishButton = useRef(null)
  const saveButton = useRef(null)

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
        <Form
          {...props}
          schema={Title}
          onSubmit={(values) => {
            handlePublish({
              tags: values.tags || "",
              image: exportedImage,
              title: values.title,
            })
          }}
        >
          <KonvaBoard
            publishButton={publishButton}
            saveButton={saveButton}
            setExportedImage={setExportedImage}
          />
          <div className="columns">
            <LabeledTextField label="Tags" name="tags" placeholder="Tags" />
            <LabeledTextField label="Title" name="title" placeholder="Title" />
          </div>
          <button ref={publishButton} className="button is-primary">
            Publish
          </button>
          <a
            download="FILENAME.png"
            href={exportedImage}
            ref={saveButton}
            className="button is-primary"
          >
            Save Image
          </a>
        </Form>
      </div>
    </div>
  )
}

CanvasPage.getLayout = (page) => <Layout title="Canvas">{page}</Layout>

export default CanvasPage
