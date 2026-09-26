import type * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const buttonVariants = tv({
    base: [
        'inline-flex items-center justify-center',
        'rounded-md',
        'text-sm font-medium',
        'transition-colors',
        'cursor-pointer',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-text',
        'disabled:pointer-events-none',
        'disabled:opacity-60',
    ],

    variants: {
        variant: {
            primary: [
                'h-11 px-5',
                'bg-brand-500 text-on-brand',
                'hover:bg-brand-600',
            ],

            secondary: [
                'h-9 px-3.5',
                'border border-line',
                'bg-transparent text-text',
                'hover:border-line-strong',
            ],
        },

        fullWidth: {
            true: 'w-full',
        },
    },

    defaultVariants: {
        variant: 'primary',
        fullWidth: false,
    },
})

interface ButtonProps extends React.ComponentProps<'button'> {
    variant?: 'primary' | 'secondary'
    fullWidth?: boolean
}

export function Button({
    variant,
    fullWidth,
    className,
    ...props
}: ButtonProps) {
    const classes = twMerge(
        buttonVariants({
            variant,
            fullWidth,
        }),
        className,
    )

    return <button className={classes} {...props} />
}
