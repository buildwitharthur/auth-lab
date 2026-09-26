import { Skeleton } from '../../../components/ui/skeleton'

export function AuthSkeleton() {
    return (
        <main
            className="flex flex-1 items-center justify-center px-6 py-12"
            aria-busy="true"
            aria-label="Carregando"
        >
            <div className="w-full max-w-[360px]">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="mt-2 h-4 w-56" />

                <div className="mt-8 flex flex-col gap-4">
                    <div>
                        <Skeleton className="h-3.5 w-14" />
                        <Skeleton className="mt-2 h-11 w-full" />
                    </div>

                    <div>
                        <Skeleton className="h-3.5 w-14" />
                        <Skeleton className="mt-2 h-11 w-full" />
                    </div>

                    <Skeleton className="mt-4 h-11 w-full" />
                </div>
            </div>
        </main>
    )
}
