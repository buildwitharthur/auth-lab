import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

import { Footer } from '../components/footer'
import { Header } from '../components/header'

import '../styles.css'

export const Route = createRootRoute({
    component: RootLayout,
})

function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-16" />}>
                <Header />
            </Suspense>

            <main className="flex flex-1 flex-col">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
