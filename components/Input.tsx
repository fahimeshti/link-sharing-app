import { forwardRef, ReactNode } from 'react';
import { Description, Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';

type Props = {
    label?: string;
    className?: string;
    startIcon?: ReactNode;
    placeholder?: string;
    name?: string;
    id?: string;
    type?: string;
}

const InputField = forwardRef<HTMLInputElement, Props>(
    ({ label, className, startIcon, ...props }, ref) => {
        return (
            <Field className='w-full'>
                {!!label && <Label className="text-sm/6 font-medium text-black">{label}</Label>}
                <div className="relative flex items-center my-3">
                    {startIcon && (
                        <div className="absolute left-3 text-black flex items-center justify-center">
                            {startIcon}
                        </div>
                    )}
                    <Input
                        {...props}
                        ref={ref}
                        className={clsx(
                            'block w-full rounded-lg border bg-white py-2 px-4 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:border data-[focus]:border-violet-600 data-[focus]:shadow-md data-[focus]:shadow-violet-400 data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            className,
                            !!startIcon ? 'pl-10' : ''
                        )}
                    />
                </div>
            </Field>
        );
    }
);

export default InputField;
