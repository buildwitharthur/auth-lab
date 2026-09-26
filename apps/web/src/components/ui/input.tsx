import type * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const inputVariants = tv({
    base: [
        'h-11 w-full',
        'rounded-md',
        'border border-line',
        'bg-surface',
        'px-3',
        'text-small text-text',
        'outline-none',
        'transition-[border-color,box-shadow]',
        'placeholder:text-text-muted',
        'focus:border-brand-500',
        'focus:ring-4',
        'focus:ring-brand-500/20',
    ],

    variants: {
        error: {
            true: [
                'border-danger',
                'focus:border-danger',
                'focus:ring-danger/15',
            ],
        },

        hasRightElement: {
            true: 'pr-11',
        },
    },
})

interface InputProps extends React.ComponentProps<'input'> {
    label: string
    error?: string
    rightElement?: React.ReactNode
}

export function Input({
    id,
    label,
    error,
    rightElement,
    className,
    ...props
}: InputProps) {
    const errorId = error ? `${id}-error` : undefined

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-medium text-text"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    aria-invalid={!!error}
                    aria-describedby={errorId}
                    className={twMerge(
                        inputVariants({
                            error: !!error,
                            hasRightElement: !!rightElement,
                        }),
                        className,
                    )}
                    {...props}
                />

                {rightElement ? (
                    <div className="absolute top-1/2 right-1.5 -translate-y-1/2">
                        {rightElement}
                    </div>
                ) : null}
            </div>

            {error ? (
                <p id={errorId} role="alert" className="mt-2 text-[13px] text-danger">
                    {error}
                </p>
            ) : null}
        </div>
    )
}
