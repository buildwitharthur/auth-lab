export function AppSkeleton() {
    return (
        <main
            className="flex flex-1 px-6 py-12 md:px-8 md:py-24"
            aria-busy="true"
            aria-label="Carregando"
        >
            <div className="mx-auto w-full max-w-[520px] animate-pulse">
                <div className="h-8 w-8 rounded-full bg-surface-raised" />

                <div className="mt-6 h-10 w-3/4 rounded-md bg-surface-raised" />

                <div className="mt-8 h-7 w-2/3 rounded-md bg-surface-raised" />

                <div className="mt-3 space-y-2">
                    <div className="h-4 w-full rounded-md bg-surface-raised" />
                    <div className="h-4 w-1/2 rounded-md bg-surface-raised" />
                </div>

                <div className="mt-12 h-5 w-40 rounded-md bg-surface-raised" />
            </div>
        </main>
    )
}
