'use client';

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideoClient, StreamVideo} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = "user-id";
//   const token = "authentication-token";
//   const user: User = { id: userId };
// we create this later

const StreamVideoProvider = ({children}: {children: ReactNode}) => {
    const [VideoClient, setVideoClient] = useState<StreamVideoClient>();
    const { user, isLoaded } = useUser();
    useEffect(() => {
        if(!isLoaded || !user) return;
        if(!apiKey) throw new Error('Stream API key missing')
        
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl,
            },
            tokenProvider,
        })

        setVideoClient(client);
    }, [user, isLoaded]);

    if(!VideoClient) return <Loader />
  return (
    <StreamVideo client={VideoClient}>
        {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;
