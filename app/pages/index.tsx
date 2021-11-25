import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { RiOpenSourceLine } from "react-icons/ri"
import painting01 from "public/images/undraw_blank_canvas_-3-rbb.svg"
import painting02 from "public/images/undraw_making_art_re_ee8w.svg"
import screenshot from "public/easel-screenshot.png"
import johnA from "public/john.png"
import bohdanK from "public/bohdan.png"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <>
      <div className="container">
        <main>
          <div className="logo">
            <Image src={logo} alt="Easel Logo" />
          </div>

          <div className="is-flex-desktop">
            <div className="tile">
              <Image src={painting01} alt="painting picture one" />
            </div>
            <p className="tile is-desktop is-size-1 p-6">
              A drawing app for creators, paint away, and post your picture! <br /> 🖌️ 🎨
            </p>
          </div>

          <Image src={screenshot} alt="Easel screenshot" />

          <div className="is-flex-desktop">
            <p className="is-desktop is-size-1 p-6">A full-stack app made for design! 😊</p>
            <div className="tile">
              <Image src={painting02} alt="painting picture two" />
            </div>
          </div>
        </main>
      </div>
      <h1 className="p-4 is-size-2 has-text-centered has-background-success has-text-white">
        Made by:
      </h1>
      <div className="columns is-centered has-background-success is-desktop p-6 is-primary">
        <div className="column is-5-desktop is-3-fullhd">
          <div className="card m-2 p-2">
            <div className="card-image m-4">
              <Image src={bohdanK} layout="responsive" alt="Bohdan Kornatskyi" />
            </div>
            <p className="title">Bohdan Kornatskyi</p>
            <p className="subtitle">Developer</p>

            <div className="card-footer">
              <div className="card-footer-item">
                <Link href="https://www.linkedin.com/in/bohdan-kornatskyi">
                  <a>
                    <svg
                      className="image is-64x64"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>LinkedIn</title>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </Link>
              </div>
              <div className="card-footer-item">
                <Link href="https://github.com/kornatskyi">
                  <a>
                    <svg
                      className="image is-64x64"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-5-desktop is-3-fullhd">
          <div className="card m-2 p-2">
            <div className="card-image m-4">
              <Image src={johnA} layout="responsive" alt="Bohdan Kornatskyi" />
            </div>
            <p className="title">John Asher</p>
            <p className="subtitle">Developer</p>

            <div className="card-footer">
              <div className="card-footer-item">
                <Link href="https://www.linkedin.com/in/-john-asher">
                  <a>
                    <svg
                      className="image is-64x64"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>LinkedIn</title>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </Link>
              </div>
              <div className="card-footer-item">
                <Link href="https://github.com/jfilm">
                  <a>
                    <svg
                      className="image is-64x64"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer p-6 has-background-primary is-flex">
        <div className="content has-text-centered is-flex is-flex-direction-row">
          <p className="has-text-white">
            <RiOpenSourceLine className="mr-1" />
            Unless specified otherwise, the code is{" "}
            <Link href="https://github.com/kornatskyi/easel">Open Source</Link> with the MIT
            License.
          </p>
        </div>
      </footer>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
