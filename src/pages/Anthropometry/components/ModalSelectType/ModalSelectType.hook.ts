import { useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export function useModalSelectTypeHook() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const redirectToAdultAnthropometry = useCallback(
    () => navigate(`/pacientes/${params.id}/antropometria/adulto`),
    [navigate, params.id]
  );

  return { redirectToAdultAnthropometry };
}
