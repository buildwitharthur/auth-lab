import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'

import { AppSkeleton } from './-components/app-skeleton'
import { AuthGuard } from './-components/auth-guard'

export const Route = createFileRoute('/app')({
    component: AppLayout,
})

function AppLayout() {
    return (
        <Suspense fallback={<AppSkeleton />}>
            <AuthGuard>
                <Outlet />
            </AuthGuard>
        </Suspense>
    )
}
