import { createFileRoute } from '@tanstack/react-router'

import { CreateAccountForm } from './-components/create-account-form'

export const Route = createFileRoute('/create-account')({
    component: CreateAccountPage,
})

function CreateAccountPage() {
    return (
        <main className="flex flex-1 items-center justify-center px-6 py-12">
            <div className="w-full max-w-[360px]">
                <h1 className="text-title text-text">Crie sua conta</h1>
                <p className="mt-1.5 text-text-muted">
                    Preencha seus dados para continuar.
                </p>

                <div className="mt-8">
                    <CreateAccountForm />
                </div>
            </div>
        </main>
    )
}
