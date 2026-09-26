import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { profileQueryKey } from '../../../hooks/use-profile'
import { createAccount } from '../../../http/create-account'

const createAccountSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Informe seu nome.')
        .max(100, 'Nome muito longo.'),

    email: z.string().trim().email('Informe um e-mail válido.'),

    password: z
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres.')
        .max(72, 'Senha muito longa.'),
})

type CreateAccountFormData = z.infer<typeof createAccountSchema>

export function CreateAccountForm() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<CreateAccountFormData>({
        resolver: zodResolver(createAccountSchema),
    })

    const createAccountMutation = useMutation({
        mutationFn: createAccount,
        onSuccess: (data) => {
            queryClient.setQueryData(profileQueryKey, data)
            navigate({ to: '/app' })
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setError('email', {
                    message: 'Este e-mail já está em uso.',
                })
                return
            }

            setError('root', {
                message: 'Não foi possível criar sua conta. Tente novamente.',
            })
        },
    })

    async function onSubmit(data: CreateAccountFormData) {
        createAccountMutation.mutate(data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
        >
            <Input
                id="name"
                label="Nome"
                autoComplete="name"
                placeholder="Arthur Reis"
                error={errors.name?.message}
                {...register('name')}
            />

            <Input
                id="email"
                label="E-mail"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="arthur@email.com"
                error={errors.email?.message}
                {...register('email')}
            />

            <Input
                id="password"
                label="Senha"
                type="password"
                autoComplete="new-password"
                placeholder="******"
                error={errors.password?.message}
                {...register('password')}
            />

            {errors.root?.message ? (
                <p role="alert" className="text-[13px] text-danger">
                    {errors.root.message}
                </p>
            ) : null}

            <Button
                type="submit"
                fullWidth
                disabled={createAccountMutation.isPending}
                className="mt-4"
            >
                {createAccountMutation.isPending
                    ? 'Criando conta...'
                    : 'Criar conta'}
            </Button>

            <p className="text-center text-sm text-text-muted">
                Já possui uma conta?{' '}
                <Link to="/" className="font-medium text-text">
                    Acesse sua conta
                </Link>
            </p>
        </form>
    )
}
