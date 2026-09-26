import { Skeleton } from './ui/skeleton'

export function HeaderSkeleton() {
    return (
        <header
            className="flex h-16 items-center justify-between px-6 sm:px-8"
            aria-hidden="true"
        >
            <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-sm" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="hidden h-3 w-36 min-[380px]:block" />
            </div>

            <Skeleton className="h-9 w-14" />
        </header>
    )
}
