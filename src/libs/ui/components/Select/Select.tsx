import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/select';

interface SelectProps extends ChakraSelectProps {
  options: { label: string; value: string }[];
}

export function Select(props: SelectProps) {
  const { options, ...selectProps } = props;

  return (
    <ChakraSelect {...selectProps}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </ChakraSelect>
  );
}
