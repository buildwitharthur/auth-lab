import { Skeleton } from '../../../components/ui/skeleton'

export function AppSkeleton() {
    return (
        <main
            className="px-6 pt-12 pb-8 sm:px-8 sm:pt-24 sm:pb-12"
            aria-busy="true"
            aria-label="Carregando"
        >
            <section className="mx-auto w-full max-w-130">
                <Skeleton className="h-8 w-8 rounded-full" />

                <Skeleton className="mt-6 h-9.5 w-3/4 sm:h-11" />

                <Skeleton className="mt-8 h-7.5 w-1/2" />

                <div className="mt-3 max-w-110 space-y-2">
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-7 w-5/6" />
                </div>

                <div className="mt-4 max-w-110 space-y-2">
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-7 w-2/3" />
                </div>

                <div className="mt-12">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="mt-2 h-4 w-56" />
                </div>
            </section>
        </main>
    )
}
