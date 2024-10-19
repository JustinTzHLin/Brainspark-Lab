import React from 'react';
import {  Modal, ModalOverlay, ModalContent, CircularProgress } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { replaceIsLoadingModalOpen } from '@/lib/features/loginSlice';

const LoadingModal = () => {
  const isLoadingModalOpen = useAppSelector((state) => state.login.userAccess.isLoadingModalOpen);
  const dispatch = useAppDispatch();

  return (
    <Modal
      isCentered isOpen={isLoadingModalOpen} motionPreset='none'
      onClose={() => dispatch(replaceIsLoadingModalOpen(false))}
    >
      <ModalOverlay
        bg='whiteAlpha.600'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent w='0' h='0' right='7rem' top='-7rem' borderRadius='7rem'>
        <CircularProgress isIndeterminate color='teal.400' size='14rem' thickness='0.5rem'/>
      </ModalContent>
    </Modal>
  );
}

export default LoadingModal;