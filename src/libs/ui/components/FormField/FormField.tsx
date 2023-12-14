import { cloneElement } from 'react';

import {
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

export interface IFormFieldProps extends FormControlProps {
  name?: string;
  label?: string;
  children: React.ReactElement;
  errorMessage?: string;
}

export default function FormField(props: IFormFieldProps) {
  const {
    name,
    label,
    children,
    errorMessage,
    defaultValue,
    className,
    ...formProps
  } = props;

  const { control } = useFormContext();

  function renderChildrenWithField(
    field: ControllerRenderProps<FieldValues, string>
  ) {
    return cloneElement(children, { id: name, ...field });
  }

  return (
    <ChakraFormControl
      {...formProps}
      className={`form-field ${className || ''}`.trim()}
    >
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      {name ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => renderChildrenWithField(field)}
        />
      ) : (
        children
      )}

      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </ChakraFormControl>
  );
}
