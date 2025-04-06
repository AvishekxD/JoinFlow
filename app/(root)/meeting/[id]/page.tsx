"use client";

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { toast } from 'sonner';

const Meeting = ({params: { id } }: {params: {id: string}}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {user} = useUser();
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const {call, isCallLoading } = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader />;

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );


  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return toast("You are not allowed to join this meeting");

  return (
    <main className="h=screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
          ): (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
    // <div>Meeting Room: #{params.id}</div>
  )
}

export default Meeting
