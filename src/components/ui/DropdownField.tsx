import { forwardRef, useId, useMemo, useState, type ComponentProps } from 'react';
import { Input } from './Input';
import { cn } from '@/lib/utils';
import { DropdownList } from './DropdownList';

interface DropdownFieldProps extends ComponentProps<'input'> {
  label?: string;
  options: string[];
  error?: string;
  isSearchable?: boolean;
}

const DropdownField = forwardRef<HTMLInputElement, DropdownFieldProps>(
  ({ label, options, error, isSearchable, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const fallbackId = useId();
    const id = props.id || fallbackId;

    const handleSelectAndClose = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);

      if (props.onChange) {
        const event = { target: { name: props.name, value: value } } as any;
        props.onChange(event);
      }
    };

    return (
      <div className="flex flex-col items-start self-stretch gap-1 relative">
        {label && (
          <label htmlFor={id} className="text-body-1-semibold text-gray-500">
            {label}
          </label>
        )}
        <Input
          id={id}
          ref={ref}
          readOnly
          value={selectedValue}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(error ? 'border-red-500 focus:border-red-500' : '', 'cursor-pointer')}
          {...props}
        />
        {error && <p className="text-body-2-semibold text-error-200">{error}</p>}

        {isOpen && (
          // mt-20 동작 이상 수정 필요
          <DropdownList
            options={options}
            isSearchable={isSearchable}
            onSelect={handleSelectAndClose}
          />
        )}
      </div>
    );
  }
);
DropdownField.displayName = 'DropdownField';

export { DropdownField };
