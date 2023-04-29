import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@leucotron-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import { api } from '@component/lib/axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres' })
    .max(20, { message: 'O nome de usuário deve ter no máximo 20 caracteres' })
    .regex(/^[a-z ]+$/i, {
      message: 'O usuário deve conter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    .regex(/^([a-záàâãéèêíïóôõöúçñ ]+)$/i, {
      message: 'O nome deve conter apenas letras e espaços',
    }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query?.username) {
      setValue('username', String(router.query?.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.name,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }

      console.error(err)
    }
  }

  return (
    <>
      <NextSeo title="Crie uma conta | Leucotron Agenda" />
      <Container>
        <Header>
          <Heading as="strong" color="blue100">
            Bem-vindo a Leucotron Agenda!
          </Heading>
          <Text color="blue200">
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm" color="blue950">
              Nome de usuário
            </Text>
            <TextInput
              prefix="leucotron.com/"
              placeholder="seu-usuario"
              {...register('username')}
              color="blue950"
            />

            {errors.username && (
              <FormError size="sm" color="stone950">
                {errors.username.message}
              </FormError>
            )}
          </label>
          <label>
            <Text size="sm" color="blue950">
              Nome completo
            </Text>
            <TextInput placeholder="Seu nome" {...register('name')} />
            {errors.name && (
              <FormError size="sm" color="stone950">
                {errors.name.message}
              </FormError>
            )}
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}
