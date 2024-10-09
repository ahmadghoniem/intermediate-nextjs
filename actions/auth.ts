'use server'
import { cookies } from 'next/headers'
import { signin, signup } from '@/utils/authTools'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'
import { emit } from 'process'
import { Ref } from 'react'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerUser = async (prevState: any, formData: FormData) => {
  //TODO: IF ALREADY SIGNED IN DON'T SHOW THIS PAGE NEITHER SIGNIN USER PAGE

  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signup(data)
    cookies().set(COOKIE_NAME, token)
  } catch (e) {
    console.error(e)
    return { message: 'failed to sign you up' }
  }
  redirect('/dashboard')
}

export const signinUser = async (prevState: any, formData: FormData) => {
  //TODO: IF ALREADY SIGNED IN DON'T SHOW THIS PAGE NEITHER REGISTER USER PAGE
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signin(data)
    cookies().set(COOKIE_NAME, token)
    formRef?.current.reset()
  } catch (e) {
    console.error(e)
    formRef?.current.reset()
    return { message: 'failed to sign you in' }
  }
  redirect('/dashboard')
}
