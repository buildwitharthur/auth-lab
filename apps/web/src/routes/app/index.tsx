import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
    component: AppPage,
})

function AppPage() {
    return <div>Hello "/app/"!</div>
}
