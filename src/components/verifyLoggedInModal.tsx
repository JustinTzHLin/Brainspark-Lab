import React from 'react';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle"
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { replaceIsLoadingModalOpen } from '@/lib/features/loginSlice';

const LoadingModal = () => {
  const isLoadingModalOpen = useAppSelector((state) => state.login.userAccess.isLoadingModalOpen);
  const dispatch = useAppDispatch();

  return (
    <DialogRoot
    placement='center' open={isLoadingModalOpen} motionPreset='none'
      onOpenChange={() => dispatch(replaceIsLoadingModalOpen(false))}
    >
      <DialogBackdrop
        bg='whiteAlpha.600'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <DialogContent w='0' h='0' right='7rem' top='-7rem' borderRadius='7rem'>
        {/* <CircularProgress isIndeterminate color='teal.400' size='14rem' thickness='0.5rem'/> */}
        <ProgressCircleRoot value={null} size='sm' color={'teal.400'} >
          <ProgressCircleRing cap="round" css={{"--thickness": "0.5rem"}} />
        </ProgressCircleRoot>
      </DialogContent>
    </DialogRoot>
  );
}

export default LoadingModal;