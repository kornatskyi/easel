import { Suspense, useEffect, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPosts from "app/posts/queries/getPosts"
import Post from "app/posts/components/Post"
import { FaArrowDown } from "react-icons/fa"

const ITEMS_PER_PAGE = 5

type SortingType = "newFirst" | "oldFirst"

export const PostsList = ({ sortingType }) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const [{ posts, hasMore }] = usePaginatedQuery(getPosts, {
    // sorting posts
    orderBy: { createdAt: sortingType === "newFirst" ? "desc" : "asc" },
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

// filter dropdown component
const FilterDropdown = ({ setSortingType }) => {
  // handle select option
  const handleSelect = (e) => {
    console.log(e.target.value)

    setSortingType(e.target.value)
  }

  return (
    <div className="is-flex is-align-items-center is-justify-content-end">
      <span className="px-2">Sort by: </span>
      <div className="select is-primary  ">
        <select onChange={handleSelect}>
          <option value={"newFirst"}>New first</option>
          <option value={"oldFirst"}> Old first</option>
        </select>
      </div>
    </div>
  )
}

const PostsPage: BlitzPage = () => {
  const [sortingType, setSortingType] = useState<SortingType>("newFirst")

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <div className="columns is-mobile is-centered">
        <div className="column is-four-fifths-mobile is-four-fifths-tablet is-two-fifths-desktop">
          <FilterDropdown setSortingType={setSortingType} />
          <div className="py-5">
            <Link href={Routes.CanvasPage()}>
              <button className="button is-link is-outlined is-centered">Create Post</button>
            </Link>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <PostsList sortingType={sortingType} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

PostsPage.authenticate = true
PostsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PostsPage
