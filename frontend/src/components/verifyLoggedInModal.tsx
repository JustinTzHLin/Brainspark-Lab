import React from "react";
import {
  DialogBackdrop,
  DialogContent,
  DialogRoot,
  DialogBody,
} from "@/components/ui/dialog";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { replaceIsLoadingModalOpen } from "@/lib/features/loginSlice";

const LoadingModal = () => {
  const isLoadingModalOpen = useAppSelector(
    (state) => state.login.userAccess.isLoadingModalOpen
  );
  const dispatch = useAppDispatch();

  return (
    <DialogRoot
      placement="center"
      open={isLoadingModalOpen}
      motionPreset="none"
      onOpenChange={() => dispatch(replaceIsLoadingModalOpen(false))}
    >
      <DialogBackdrop
        bg="whiteAlpha.600"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      {/* <CircularProgress isIndeterminate color='teal.400' size='14rem' thickness='0.5rem'/> */}
      <DialogContent w={0} h={0} right="7rem" top="-7rem" borderRadius="7rem">
        {/* <DialogBody>
          <ProgressCircleRoot value={null} size="xl">
            <ProgressCircleRing cap="round" />
          </ProgressCircleRoot>
        </DialogBody> */}
      </DialogContent>
    </DialogRoot>
  );
};

export default LoadingModal;
