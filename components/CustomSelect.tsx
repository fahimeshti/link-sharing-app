import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'
import { FaChevronDown, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'

const socials = [
    { id: 1, name: 'Github', icon: <FaGithub /> },
    { id: 3, name: 'YouTube', icon: <FaYoutube /> },
    { id: 2, name: 'LinkedIn', icon: <FaLinkedin /> },
]

function getDefaultValue(value: string) {
    return socials.filter(item => item.name?.toLowerCase() === value?.toLowerCase())[0];
}

export default function CustomSelect({ onChange, label, defaultValue }: any) {
    const [selected, setSelected] = useState(getDefaultValue(defaultValue) || socials[0]);

    return (
        <Field className="w-full">
            {!!label && <Label className="text-sm/6 font-medium text-black">{label}</Label>}
            <Listbox
                value={selected}
                onChange={(v) => {
                    setSelected(v);
                    !!onChange && onChange(v);
                }}
            >
                <ListboxButton
                    className={clsx(
                        'relative w-full rounded-md bg-white border mt-3 py-2 pr-8 pl-3 text-left text-sm/6 text-black flex items-center gap-3',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                >
                    {selected.icon}
                    {selected.name}
                    <FaChevronDown
                        className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-black/60"
                        aria-hidden="true"
                    />
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'w-[var(--button-width)] rounded-xl border bg-white mt-2 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {socials.map((person) => (
                        <ListboxOption
                            key={person.name}
                            value={person}
                            className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/5"
                        >
                            {person.icon}
                            <div className="text-sm/6 text-black">{person.name}</div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </Field>
    )
}
