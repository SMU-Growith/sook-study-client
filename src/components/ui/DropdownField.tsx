import { forwardRef, useEffect, useId, useState, type ComponentProps } from 'react';
import { Input } from './Input';
import { cn } from '@/lib/utils';
import { DropdownList } from './DropdownList';
import { useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

interface DropdownFieldProps extends ComponentProps<'input'> {
  name: string;
  label?: string;
  options: string[] | Record<string, string[]>;
  error?: string;
  isSearchable?: boolean;
  type?: 'dropdown' | 'dropdownTwoLevel';
}

const DropdownField = forwardRef<HTMLInputElement, DropdownFieldProps>(
  ({ label, options, error, isSearchable, type, ...props }, ref) => {
    const fallbackId = useId();
    const id = props.id || fallbackId;

    // dropdown 단일
    const [isSingleOpen, setIsSingleOpen] = useState(false);
    const [singleValue, setSingleValue] = useState('');
    // dropdown 2단계
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isSubOpen, setIsSubOpen] = useState(false);
    const [selectedMain, setSelectedMain] = useState('');
    const [selectedSub, setSelectedSub] = useState('');

    const { control } = useFormContext();
    const watchedValue = useWatch({ control, name: props.name });

    useEffect(() => {
      if (watchedValue && typeof watchedValue === 'string') {
        setSingleValue(watchedValue);
      }
    }, [watchedValue]);

    const handleSingleSelectAndClose = (value: string) => {
      setSingleValue(value);
      setIsSingleOpen(false);

      if (props.onChange) {
        const event = { target: { name: props.name, value } } as any;
        props.onChange(event);
      }
    };

    // dropdown 2단계 중 첫번째 선택
    const handleMainSelect = (value: string) => {
      setSelectedMain(value);
      setSelectedSub('');
      setIsSubOpen(true);
    };

    // dropdown 2단계 중 두번째 선택
    const handleSubSelectAndClose = (value: string) => {
      console.log('selectedMain', selectedMain);
      console.log('selectedSub', value);
      setSelectedSub(value);
      const combinedValue = `${selectedMain} - ${value}`;
      if (props.onChange) {
        const event = { target: { name: props.name, value: combinedValue } } as any;
        props.onChange(event);
      }
      setIsMainOpen(false);
      setIsSubOpen(false);
    };

    if (type === 'dropdownTwoLevel' && typeof options === 'object' && !Array.isArray(options)) {
      const mainOptions = Object.keys(options);
      const subOptions = selectedMain ? options[selectedMain] : [];
      const displayValue = selectedMain && selectedSub ? `${selectedMain} - ${selectedSub}` : '';

      return (
        <div className="flex flex-col items-start self-stretch gap-1">
          {label && (
            <label htmlFor={id} className="text-body-1-semibold text-gray-500">
              {label}
            </label>
          )}
          <div className="relative w-full">
            <Input
              id={id}
              ref={ref}
              readOnly
              value={displayValue}
              onClick={() => {
                setIsMainOpen(!isMainOpen);
                setIsSubOpen(false);
              }}
              className={cn(error ? 'border-red-500 focus:border-red-500' : '', 'cursor-pointer')}
              {...props}
            />
            {error && <p className="text-body-2-semibold text-error-200">{error}</p>}

            {isMainOpen && (
              <div className="relative">
                <DropdownList
                  options={mainOptions}
                  isSearchable={isSearchable}
                  onSelect={handleMainSelect}
                  selectedValue={selectedMain}
                />
              </div>
            )}
            {isSubOpen && (
              <div className="relative ml-34">
                <DropdownList
                  options={subOptions}
                  isSearchable={isSearchable}
                  onSelect={handleSubSelectAndClose}
                  selectedValue={selectedSub}
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-start self-stretch gap-1">
        {label && (
          <label htmlFor={id} className="text-body-1-semibold text-gray-500">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <Input
            id={id}
            ref={ref}
            readOnly
            value={singleValue}
            onClick={() => setIsSingleOpen(!isSingleOpen)}
            className={cn(error ? 'border-red-500 focus:border-red-500' : '', 'cursor-pointer')}
            {...props}
          />
          {error && <p className="text-body-2-semibold text-error-200">{error}</p>}

          {isSingleOpen && (
            <DropdownList
              options={options as string[]}
              isSearchable={isSearchable}
              onSelect={handleSingleSelectAndClose}
            />
          )}
        </div>
      </div>
    );
  }
);
DropdownField.displayName = 'DropdownField';

export { DropdownField };
