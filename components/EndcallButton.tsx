"use client";

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndcallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner = React.useMemo(() => {
    return localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;
  }, [localParticipant, call?.state.createdBy, call?.state.createdBy?.id, localParticipant?.userId]);

  if (!isMeetingOwner) return null;

  const handleEndCall = async () => {
    if (call) {
      try {
        await call.endCall();
        router.push('/');
      } catch (error) {
        console.error("Error ending call:", error);
        // Optionally handle the error, e.g., show a notification to the user
      }
    } else {
      console.warn("Call object is not available.");
      router.push('/'); // Still navigate, maybe with a message?
    }
  };

  return (
    <Button onClick={handleEndCall} className="bg-red-500">
      End call for everyone
    </Button>
  );
};

export default EndcallButton;