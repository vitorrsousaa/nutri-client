import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/select';

import Spinner from '../Spinner';

import { Autocomplete } from './components/Autocomplete';

export type SelectOptionsType = { label: string; value: string };

interface SelectProps extends Omit<ChakraSelectProps, 'autoComplete'> {
  options: SelectOptionsType[];
  isLoading?: boolean;
  autoComplete?: boolean;
  autoCompleteOptions?: {
    noOptionsMessage?: string;
    placeholder?: string;
  };
  value?: SelectOptionsType['value'];
}

export function Select(props: SelectProps) {
  const {
    options,
    isLoading,
    autoComplete,
    isDisabled,
    autoCompleteOptions,
    ...selectProps
  } = props;

  return (
    <>
      {autoComplete ? (
        <Autocomplete
          isLoading={isLoading}
          isDisabled={isDisabled}
          noOptionsMessage={autoCompleteOptions?.noOptionsMessage}
          placeholder={autoCompleteOptions?.placeholder}
          options={options}
          onChange={selectProps.onChange}
          value={selectProps.value}
        />
      ) : (
        <ChakraSelect
          {...selectProps}
          isDisabled={isDisabled || isLoading}
          icon={isLoading ? <Spinner thickness="2px" /> : <ChevronDownIcon />}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </ChakraSelect>
      )}
    </>
  );
}
