'use client'
import { signinUser } from '@/actions/auth'
import { Input } from '@nextui-org/react'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import SubmitButton from './SubmitButton'
import { useRef } from 'react'
const initState = { message: null }

const SigninForm = () => {
  const formRef = useRef<HTMLFormElement>(null)
  // useActionState is a Hook that allows you to update state based on the result of a form action.
  const [formState, action] = useFormState<{ message: string | null }>(
    signinUser,
    initState
  )
  return (
    <form
      action={action}
      ref={formRef}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign in</h3>
      <Input
        fullWidth
        required
        size="lg"
        placeholder="Email"
        name="email"
        type="email"
      />
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
      />
      <SubmitButton label={'Sign in'} />
      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>
      {formState?.message && <p>{formState.message}</p>}
    </form>
  )
}

export default SigninForm
