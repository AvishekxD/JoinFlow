'use client';

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "sonner";

const isCall = (meeting: Call | CallRecording): meeting is Call => {
    return 'state' in meeting;
};

const isCallRecording = (meeting: Call | CallRecording): meeting is CallRecording => {
    return 'filename' in meeting;
};

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    const getCalls= () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings; 
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage= () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Recordings';
            case 'upcoming':
                return 'No Upcoming Calls';
            default:
                return '';
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()) ?? [],)
                const fetchedRecordings = callData
                    .filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings)
                    
                setRecordings(fetchedRecordings);
            } catch (error) {
                console.error("Error fetching recordings:", error);
                toast("Try again later");
            }
        }
        if(type === 'recordings' && !isLoading) {
            fetchRecordings();
        }
    }, [type, callRecordings, isLoading]);

    const calls = getCalls();
    const NoCallsMessage = getNoCallsMessage();

    if(isLoading) return <Loader />

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                    key={isCall(meeting) ? meeting.id : meeting.url}
                    icon={
                        type === 'ended'
                        ? '/icons/previous.svg'
                        : type === 'upcoming'
                        ? '/icons/upcoming.svg'
                        : '/icons/recordings.svg'
                    }
                    title={
                        isCall(meeting) 
                            ? meeting.state?.custom?.description?.substring(0, 26) || 'Personal Meeting'
                            : meeting.filename?.substring(0, 20) || 'Personal Meeting'
                    }
                    date={
                        isCall(meeting)
                            ? meeting.state?.startsAt?.toLocaleString() || 'N/A'
                            : meeting.start_time?.toLocaleString() || 'N/A'
                    }
                    isPreviousMeeting={type === 'ended'}
                    buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                    buttonText={type === 'recordings' ? 'Play' : 'Start'}
                    handleClick={() => {
                        if (type === 'recordings' && isCallRecording(meeting)) {
                            router.push(meeting.url);
                        } else if (isCall(meeting)) {
                            router.push(`/meeting/${meeting.id}`);
                        }
                    }}
                    link={
                        type === 'recordings' && isCallRecording(meeting)
                            ? meeting.url
                            : isCall(meeting)
                            ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
                            : '#'
                    }
                />
            )) : (
                <h1>{NoCallsMessage}</h1>
            )}
        </div>
    )
};

export default CallList;