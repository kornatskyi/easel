import { Suspense } from "react"
import { Navbar } from "react-bulma-components"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Link, Routes, useMutation } from "blitz"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className="py-2 px-2">
          <h2>{currentUser.name}</h2>
        </div>
        <div className="py-2 px-2">
          <button
            className="button small is-danger is-outlined is-fullwidth"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="py-2 px-2">
          <Link href={Routes.SignupPage()}>
            <a className="button small is-primary is-fullwidth">
              <strong>Sign Up</strong>
            </a>
          </Link>
        </div>
        <div className="py-2 px-2">
          <Link href={Routes.LoginPage()}>
            <a className="button small is-info is-fullwidth">
              <strong>Login</strong>
            </a>
          </Link>
        </div>
      </>
    )
  }
}

function toggleDropdown() {
  const myNav = document.querySelector("#my-nav")
  const burger = document.querySelector("#burger")
  myNav!.classList.toggle("is-active")
  burger!.classList.toggle("is-active")
}

export function Nav() {
  return (
    <Navbar fixed="top">
      <Navbar.Brand>
        <Navbar.Item>
          <h1 className="is-size-4">Easel</h1>
        </Navbar.Item>
        <Navbar.Burger id="burger" onClick={toggleDropdown} />
      </Navbar.Brand>
      <Navbar.Menu id="my-nav">
        <Navbar.Container align="right">
          <Navbar.Item>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  )
}

export default Nav
