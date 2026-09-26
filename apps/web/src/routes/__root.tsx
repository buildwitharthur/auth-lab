import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

import { ErrorPage } from '../components/error-page'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { HeaderSkeleton } from '../components/header-skeleton'
import { NotFoundPage } from '../components/not-found-page'

import '../styles.css'

export const Route = createRootRoute({
    component: RootLayout,
    notFoundComponent: NotFoundPage,
    errorComponent: ErrorPage,
})

function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Suspense fallback={<HeaderSkeleton />}>
                <Header />
            </Suspense>

            <main className="flex flex-1 flex-col">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
