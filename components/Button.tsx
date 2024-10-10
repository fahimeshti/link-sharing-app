import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
    variant?: 'solid' | 'outline' | 'noStyle';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    StartIcon?: React.ElementType;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<ButtonProps> = ({ variant = 'solid', children, onClick, className, StartIcon, type = 'button', disabled }) => {
    const baseStyles = 'px-4 py-2 rounded-md font-semibold focus:outline-none transition-all duration-150 flex items-center gap-2 justify-center disabled:bg-gray-400 disabled:text-gray-700 disabled:border-gray-400 disabled:cursor-not-allowed';
    const solidStyles = 'bg-primary text-white hover:bg-violet-600 border border-primary';
    const outlineStyles = 'border border-primary text-primary hover:bg-primary hover:text-white';
    const noStyle = 'bg-transparent border border-transparent text-inherit';

    const variantStyles =
        variant === 'solid' ? solidStyles :
            variant === 'outline' ? outlineStyles :
                noStyle;

    return (
        <button
            className={clsx(baseStyles, variantStyles, className)}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {StartIcon && <StartIcon className="w-5 h-5" />}
            {children}
        </button>
    );
};

export default Button;
