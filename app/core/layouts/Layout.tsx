import { Head, BlitzLayout } from "blitz"
import Nav from "../components/Nav"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "easel"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-5">
        <Nav />
      </div>
      {children}
    </>
  )
}

export default Layout
