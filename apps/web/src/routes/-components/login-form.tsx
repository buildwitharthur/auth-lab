import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { login } from '../../http/login'
import { profileQueryKey } from '../../hooks/use-profile'

const loginSchema = z.object({
    email: z.string().trim().email('Informe um e-mail válido.'),
    password: z.string().min(1, 'Informe sua senha.'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.setQueryData(profileQueryKey, data)
            navigate({ to: '/app' })
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setError('root', { message: 'Credenciais inválidas.' })
                    return
                }

                if (error.response?.status === 400) {
                    setError('root', {
                        message: 'Verifique os dados informados.',
                    })
                    return
                }

                if (error.response?.status === 429) {
                    setError('root', {
                        message:
                            'Muitas tentativas. Tente novamente em alguns minutos.',
                    })
                    return
                }
            }

            setError('root', {
                message: 'Não foi possível entrar. Tente novamente.',
            })
        },
    })

    async function onSubmit(data: LoginFormData) {
        loginMutation.mutate(data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
        >
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
                autoComplete="current-password"
                placeholder="Sua senha"
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
                disabled={loginMutation.isPending}
                className="mt-4"
            >
                {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
            </Button>

            <p className="text-center text-sm text-text-muted">
                Ainda não tem uma conta?{' '}
                <Link to="/create-account" className="font-medium text-text">
                    Criar conta
                </Link>
            </p>
        </form>
    )
}
