import { useState } from 'react';

export function useDashboardHook() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  return {
    modalIsOpen,
    handleCloseModal,
    handleOpenModal,
  };
}
