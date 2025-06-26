import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { Fragment, useRef, useLayoutEffect, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface SelectProps<T = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function Select<T = string>({
  options,
  value,
  onChange,
  label,
  className,
  disabled,
}: SelectProps<T>) {
  const selected = options.find((o) => o.value === value) || options[0];
  const optionsRef = useRef<HTMLUListElement>(null);
  const [alignLeft, setAlignLeft] = useState(false);

  useLayoutEffect(() => {
    const handlePosition = () => {
      const el = optionsRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          setAlignLeft(true);
        } else {
          setAlignLeft(false);
        }
      }
    };
    window.addEventListener('resize', handlePosition);
    handlePosition();
    return () => window.removeEventListener('resize', handlePosition);
  }, []);

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <span className="block truncate">{selected?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              ref={optionsRef}
              className={clsx(
                'absolute z-10 mt-1 max-h-60 min-w-max w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                alignLeft ? 'right-0 left-auto' : 'left-0 right-auto'
              )}
              style={{ minWidth: 'max-content' }}
            >
              {options.map((option) => (
                <ListboxOption
                  key={String(option.value)}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span className={clsx('block truncate', selected ? 'font-semibold' : 'font-normal')}>
                        {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
