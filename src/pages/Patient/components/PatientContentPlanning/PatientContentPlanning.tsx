import { TPlanningMeal } from '@godiet-entities/planning/TPlanningMeal';
import Divider from '@godiet-ui/Divider';
import Text from '@godiet-ui/Text';

import * as styled from './PatientContentPlanning.styles';

export interface PatientContentPlanningProps {
  planningMeal: TPlanningMeal;
}

export function PatientContentPlanning(props: PatientContentPlanningProps) {
  const { planningMeal } = props;

  return (
    <>
      <Text fontSize={'18px'} fontWeight={500}>
        Descrição:
      </Text>
      <Text fontSize={'16px'} as="small">
        {planningMeal.description || 'Esse plano não tem descrição'}
      </Text>

      <Divider marginY={'16px'} />

      {planningMeal.meals.map((meal, index) => {
        return (
          <styled.PatientContainerMeal key={`meal-${meal.id}`}>
            <Text fontSize={'18px'} fontWeight={500}>
              Refeição {index + 1}
            </Text>
            <Text as="small" className="small-text">
              Nome: {meal.name}
            </Text>
            <Text as="small" className="small-text">
              Horário:{' '}
              {new Intl.DateTimeFormat('pt-br', {
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(meal.time))}
            </Text>
            <Divider height={'1px'} />
            {meal.mealFoods.map((mealFood) => {
              return (
                <div key={`meal-food-${mealFood.id}`}>
                  <Text>{mealFood.name}</Text>
                  <Text>
                    {mealFood.quantity} ({mealFood.baseUnit})
                  </Text>
                </div>
              );
            })}
          </styled.PatientContainerMeal>
        );
      })}
    </>
  );
}
