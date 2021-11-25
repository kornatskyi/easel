import { Head, BlitzLayout } from "blitz"
import Nav from "../components/Nav"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "easel"}</title>
        <link rel="icon" href="/favicon.ico" />

        <title>Easel</title>
        <meta name="title" content="Easel" />
        <meta name="description" content="A drawing app for creators." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://easel-kornatskyi.vercel.app/" />
        <meta property="og:title" content="Easel" />
        <meta property="og:description" content="A drawing app for creators." />
        <meta property="og:image" content="Drawing App" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://easel-kornatskyi.vercel.app/" />
        <meta property="twitter:title" content="Easel" />
        <meta property="twitter:description" content="A drawing app for creators." />
        <meta property="twitter:image" content="Drawing App" />
      </Head>

      <div className="py-5">
        <Nav />
      </div>
      {children}
    </>
  )
}

export default Layout
