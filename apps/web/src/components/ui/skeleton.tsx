import type * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface SkeletonProps extends React.ComponentProps<'div'> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            aria-hidden="true"
            className={twMerge(
                'animate-pulse rounded-md bg-surface-raised',
                className,
            )}
            {...props}
        />
    )
}
