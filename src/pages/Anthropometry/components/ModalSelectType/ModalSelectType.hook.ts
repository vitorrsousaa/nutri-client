import { useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ModalSelectTypeProps } from './ModalSelectType';

export function useModalSelectTypeHook(props: ModalSelectTypeProps) {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const redirectToAdultAnthropometry = useCallback(
    () => navigate(`/pacientes/${params.id}/antropometria/adulto`),
    [navigate, params.id]
  );

  return { redirectToAdultAnthropometry };
}
