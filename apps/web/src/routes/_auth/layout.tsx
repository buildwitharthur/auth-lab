import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'

import { useProfile } from '../../hooks/use-profile'

import { AuthSkeleton } from './-components/auth-skeleton'

export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
})

function AuthLayout() {
    return (
        <Suspense fallback={<AuthSkeleton />}>
            <PublicAuthContent />
        </Suspense>
    )
}

function PublicAuthContent() {
    const { data: profile } = useProfile()

    if (profile) {
        return <Navigate to="/app" replace />
    }

    return <Outlet />
}
