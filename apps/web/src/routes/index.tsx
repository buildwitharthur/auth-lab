import { createFileRoute } from '@tanstack/react-router'

import { LoginForm } from './-components/login-form'

export const Route = createFileRoute('/')({
    component: LoginPage,
})

function LoginPage() {
    return (
        <main className="flex flex-1 items-center justify-center px-6 py-12">
            <div className="w-full max-w-[360px]">
                <h1 className="text-title text-text">Entre na sua conta</h1>
                <p className="mt-1.5 text-text-muted">
                    Use suas credenciais para continuar.
                </p>

                <div className="mt-8">
                    <LoginForm />
                </div>
            </div>
        </main>
    )
}
