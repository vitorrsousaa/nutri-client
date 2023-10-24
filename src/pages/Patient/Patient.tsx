import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../libs/ui/components/Button';
import PatientService from '../../service/Patient';

export function Patient() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, remove } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => PatientService.findById(id),
  });

  const navigate = useNavigate();

  const returnPage = useCallback(() => {
    remove();
    navigate('/dashboard');
  }, []);

  console.log(data);

  return (
    <div>
      {isLoading ? (
        <>
          <strong>isLoading</strong>
        </>
      ) : (
        <>
          <Button onClick={returnPage}>Voltar</Button>
          <strong>patient</strong>
          <small>{id}</small>
        </>
      )}
    </div>
  );
}
