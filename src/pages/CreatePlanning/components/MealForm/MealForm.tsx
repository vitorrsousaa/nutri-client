import Text from '@godiet-ui/Text';

import { DeleteIcon } from '@chakra-ui/icons';

import Button from '../../../../libs/ui/components/Button';
import FormField from '../../../../libs/ui/components/FormField';
import Input from '../../../../libs/ui/components/Input';
import FoodForm from '../FoodForm';

import * as styled from './MealForm.styles';

interface MealFormProps {
  onRemoveMeal: (index: number) => void;
  mealIndex: number;
  isCreatingPlanningMeal: boolean;
}

export function MealForm(props: MealFormProps) {
  const { mealIndex, isCreatingPlanningMeal, onRemoveMeal } = props;

  return (
    <styled.MealFormContainer>
      <div className="container-title">
        <Text as="h1" fontWeight={500}>
          Refeição {mealIndex + 1}
        </Text>
        <Button
          variant={'danger'}
          onClick={() => onRemoveMeal(mealIndex)}
          isDisabled={isCreatingPlanningMeal}
        >
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

      <FoodForm
        mealIndex={mealIndex}
        isCreatingPlanningMeal={isCreatingPlanningMeal}
      />
    </styled.MealFormContainer>
  );
}
