import { Outlet, createRootRoute } from '@tanstack/react-router'

import { Footer } from '../components/footer'
import { Header } from '../components/header'

import '../styles.css'

export const Route = createRootRoute({
    component: RootLayout,
})

function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex flex-1 flex-col">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
