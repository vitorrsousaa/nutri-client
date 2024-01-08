import { useCallback, useMemo, useState } from 'react';

import Divider from '@godiet-ui/Divider';
import { SelectOptionsType } from '@godiet-ui/Select';
import Spinner from '@godiet-ui/Spinner';

import { ChevronDownIcon } from '@chakra-ui/icons';
import Select, { SingleValue } from 'react-select';

interface AutocompleteSelectProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  noOptionsMessage?: string;
  options: SelectOptionsType[];
  placeholder?: string;
  value?: SelectOptionsType['value'];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Autocomplete(props: AutocompleteSelectProps) {
  const {
    isLoading,
    isDisabled,
    noOptionsMessage,
    options,
    placeholder,
    value,
    onChange,
  } = props;

  const [optionValue, setOptionValue] = useState<SelectOptionsType | null>(
    () => options.find((option) => option.value === value) || null
  );

  const filteredOptions = useMemo(
    () => options.filter((option) => option.value !== ''),
    [options]
  );

  const handleInputChange = useCallback(
    (newValue: SingleValue<SelectOptionsType>) => {
      const newEvent = {
        target: {
          value: newValue ? newValue.value : null,
        },
      };

      setOptionValue(newValue || null);

      onChange && onChange(newEvent as React.ChangeEvent<HTMLSelectElement>);
    },
    [onChange]
  );

  return (
    <>
      <Select
        maxMenuHeight={400}
        value={optionValue}
        options={filteredOptions}
        noOptionsMessage={() => noOptionsMessage || 'Nenhuma opção encontrada'}
        placeholder={placeholder}
        isLoading={isLoading}
        isDisabled={isDisabled || isLoading}
        onChange={handleInputChange}
        isClearable
        isSearchable
        components={{
          LoadingIndicator: () => (
            <Spinner
              thickness="2px"
              width={'20px'}
              height={'20px'}
              marginRight={'4px'}
            />
          ),
          DropdownIndicator: () =>
            !isLoading && (
              <ChevronDownIcon fontSize={'16px'} marginRight={'4px'} />
            ),
          IndicatorSeparator: () =>
            !isLoading && (
              <Divider
                orientation="vertical"
                width={'2px'}
                height={'22px'}
                marginRight={'8px'}
              />
            ),
        }}
      />
    </>
  );
}
