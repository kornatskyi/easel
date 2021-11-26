import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { useRef, useState } from "react"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [email, setEmail] = useState("Get demo email")
  let [demoEmail, setDemoEmail] = useState(false)
  const [copyTooltip, setCopyTooltip] = useState(false)

  return (
    <div className="column card is-8-mobile is-4-tablet is-3-desktop">
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <div className="is-flex is-flex-direction-column">
          <h1>Create an Account</h1>
          <a
            className="tooltip"
            data-tooltip="Tooltip Text"
            onClick={(e) => {
              e.preventDefault()
              if (!demoEmail) {
                fetch("https://10minutemail.net/address.api.php")
                  .then((res) => res.json())
                  .then((res) => {
                    setEmail(res.mail_get_mail)

                    setDemoEmail(true)
                    setCopyTooltip(true)
                    setTimeout(() => {
                      setCopyTooltip(false)
                    }, 300)
                    navigator.clipboard.writeText(res.mail_get_mail)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              } else {
                navigator.clipboard.writeText(email)
                setCopyTooltip(true)
                setTimeout(() => {
                  setCopyTooltip(false)
                }, 400)
              }
            }}
          >
            {email}
            {copyTooltip ? <span className="tooltiptext">Copied</span> : <></>}
          </a>

          <style jsx>{`
            /* Tooltip container */
            .tooltip {
              position: relative;
              display: flex;
            }

            /* Tooltip text */
            .tooltip .tooltiptext {
              visibility: hidden;
              font-size: 12px;
              height: auto;
              width: 60px;
              background-color: #3488ce;
              color: #fff;
              text-align: center;
              padding: 3px 0;
              border-radius: 6px;
              top: 20px;

              /* Position the tooltip text - see examples below! */
              position: absolute;
              z-index: 1;
            }

            /* Show the tooltip text when you mouse over the tooltip container */
            .tooltip .tooltiptext {
              visibility: visible;
            }
          `}</style>
        </div>
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="name" label="Name" placeholder="Name" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}

export default SignupForm
