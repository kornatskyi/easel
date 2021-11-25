import React, { Suspense, useRef, useState } from "react"
import KonvaBoard from "app/canvas/components/KonvaBoard"
import {
  ClientSession,
  Image,
  Link,
  Routes,
  useMutation,
  useQuery,
  useRouter,
  useSession,
} from "blitz"
import { FORM_ERROR } from "final-form"
import createPost from "app/posts/mutations/createPost"
import Form from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import Layout from "app/core/layouts/Layout"
import { Title } from "app/auth/validations"
import getCurrentUser from "app/users/queries/getCurrentUser"

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
  const session: ClientSession = useSession()
  console.log("🚀 ~ session", session)

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
    <div className="columns is-centered mgt-medium p-5 ">
      <div className="column is-three-fifths-widescreen is-four-fifths-desktop is-four-fifths-tablet content is-centered">
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
          <div className="columns is-align-items-end is-justify-content-space-between">
            <div className="is-flex is-align-items-end is-justify-content-space-between column">
              <div className="mr-2 ">
                <LabeledTextField label="Tags" name="tags" placeholder="Tags" />
              </div>
              <div className="ml-2 ">
                <LabeledTextField label="Title" name="title" placeholder="Title" />
              </div>
            </div>
            <div className="is-flex is-align-items-end is-justify-content-space-between column">
              <a
                download="FILENAME.png"
                href={exportedImage}
                ref={saveButton}
                className="button is-primary is-fullwidth "
              >
                Download
              </a>

              <button
                disabled={!session.userId}
                ref={publishButton}
                className="button is-primary  is-fullwidth ml-4 is-disabled "
              >
                Publish
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

CanvasPage.getLayout = (page) => (
  <Suspense fallback={<div>Loading</div>}>
    <Layout title="Canvas">{page}</Layout>
  </Suspense>
)

export default CanvasPage
