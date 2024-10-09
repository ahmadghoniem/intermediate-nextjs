'use client'

import { Button } from '@nextui-org/react'
// useFormStatus is embedded in a component that's a child of a form
// it knows the status of that form action automatically as an out of the box pending state
import { useFormStatus } from 'react-dom'

const SubmitButton = ({ label, ...btnProps }) => {
  const { isPending } = useFormStatus()
  return (
    <Button {...btnProps} type="submit" isLoading={isPending}>
      {label}
    </Button>
  )
}

export default SubmitButton
