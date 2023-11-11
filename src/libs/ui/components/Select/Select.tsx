import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/select';
import { Spinner } from '@chakra-ui/spinner';

export type SelectOptionsType = { label: string; value: string };

interface SelectProps extends ChakraSelectProps {
  options: SelectOptionsType[];
  isLoading?: boolean;
}

export function Select(props: SelectProps) {
  const { options, isLoading, ...selectProps } = props;

  return (
    <ChakraSelect
      {...selectProps}
      icon={isLoading ? <Spinner /> : <ChevronDownIcon />}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </ChakraSelect>
  );
}
