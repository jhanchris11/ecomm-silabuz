import { useEffect, useMemo, useState } from 'react'

interface FormProps {
  email: string
  password: string
  displayName?: string
}
interface FormPropsValidate {
  emailValid: string
  passwordValid: string
  displayNameValid: string
}

type FormItem = 'email' | 'password' | 'displayName'
type AFunctionType = (value: string) => boolean
// type FormItemValidation = Record<FormItem, [ReturnType<AFunctionType>, string]>

export const useForm = (initialValues: FormProps, formValidations?: any) => {
  const [formState, setFormState] = useState(initialValues)

  const [formValidation, setFormValidation] = useState<any>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }
  const handleResetForm = (): void => {
    setFormState(initialValues)
  }

  const isFormValid = useMemo(() => {
    if (formValidation) {
      for (const formValue of Object.keys(formValidation)) {
        if (formValidation[formValue] !== null) return false
      }
    }
    return true
  }, [formValidation])

  useEffect(() => {
    createValidations()
  }, [formState])

  const createValidations = () => {
    const formCheckedValues = {} as any // type FormItem = 'email' | 'password' | 'displayName'

    if (formValidations) {
      for (const formField of Object.keys(formValidations)) {
        const [fn, errorMessage] = formValidations[formField]
        formCheckedValues[`${formField}Valid`] = fn(
          formState[formField as FormItem]
        )
          ? null
          : errorMessage
      }
    }

    setFormValidation(formCheckedValues)
  }

  return {
    ...formState,
    formState,
    handleInputChange,
    handleResetForm,
    isFormValid,
    ...formValidation
  }
}
