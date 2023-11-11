import Button from '../../../../libs/ui/components/Button';
import FormField from '../../../../libs/ui/components/FormField';
import Input from '../../../../libs/ui/components/Input';
import FoodForm from '../FoodForm';

interface MealFormProps {
  onRemoveMeal: (index: number) => void;
  mealIndex: number;
}

export function MealForm(props: MealFormProps) {
  const { mealIndex, onRemoveMeal } = props;

  return (
    <div>
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
      >
        <Input placeholder="Horário da refeição" type="time" />
      </FormField>

      <FoodForm mealIndex={mealIndex} />

      <Button colorScheme="red" onClick={() => onRemoveMeal(mealIndex)}>
        Remover refeição
      </Button>
    </div>
  );
}
