import { DeleteIcon } from '@chakra-ui/icons';

import Button from '../../../../libs/ui/components/Button';
import FormField from '../../../../libs/ui/components/FormField';
import Input from '../../../../libs/ui/components/Input';
import FoodForm from '../FoodForm';

import * as styled from './MealForm.styles';

interface MealFormProps {
  onRemoveMeal: (index: number) => void;
  mealIndex: number;
}

export function MealForm(props: MealFormProps) {
  const { mealIndex, onRemoveMeal } = props;

  return (
    <styled.MealFormContainer>
      <div className="container-title">
        <h1>Refeição {mealIndex + 1}</h1>
        <Button variant={'danger'} onClick={() => onRemoveMeal(mealIndex)}>
          <DeleteIcon />
        </Button>
      </div>
      <styled.MealFormContent>
        <FormField
          name={`meals.${mealIndex}.name`}
          label="Nome da refeição"
          isRequired
        >
          <Input placeholder="Nome da refeição" />
        </FormField>

        <FormField
          name={`meals.${mealIndex}.time`}
          label="Horário da refeição"
          isRequired
          width={'300px'}
        >
          <Input placeholder="Horário da refeição" type="time" />
        </FormField>
      </styled.MealFormContent>

      <FoodForm mealIndex={mealIndex} />
    </styled.MealFormContainer>
  );
}
