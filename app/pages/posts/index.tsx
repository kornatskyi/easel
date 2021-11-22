import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPosts from "app/posts/queries/getPosts"
import Post from "app/posts/components/Post"

const ITEMS_PER_PAGE = 100

export const PostsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ posts, hasMore }] = usePaginatedQuery(getPosts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      {posts.map((post, i) => (
        <Post post={post} key={i} />
      ))}

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PostsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <div className="columns is-mobile is-centered">
        <div className="column is-four-fifths-mobile is-four-fifths-tablet is-three-fifths-desktop">
          <div className="py-5">
            <Link href={Routes.CanvasPage()}>
              <button className="button is-link is-outlined is-centered">Create Post</button>
            </Link>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <PostsList />
          </Suspense>
        </div>
      </div>
    </>
  )
}

PostsPage.authenticate = true
PostsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PostsPage
