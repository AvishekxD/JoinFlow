'use client';

import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModel from './MeetingModel';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast } from "sonner"
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';


const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setvalues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    })
    
    const [CallDetails, setCallDetails] = useState<Call>()
    // const { toast } = useToast()

    const createMeeting = async () => {
        if(!client || !user) return;
        try {
            if(!values.dateTime){
                toast("Please select a date amd time")
                return;
            }


            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if(!call) throw new Error('Failed to create call')
            
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            if(!values.description) {
                router.push(`/meeting/${call.id}`)
            }

            toast("Meeting Created")

        } catch (error) {
            console.log(error)
            toast("Failed to create meeting")
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${CallDetails?.id}`

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard 
                img="/icons/add-meeting.svg"
                title="New Meeting"
                desciption="Start an instant meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className="bg-[#FF742E]"
            />
            <HomeCard 
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                desciption="Plan your meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-[#0E78F9]"
            />
            <HomeCard 
                img="/icons/recordings.svg"
                title="View Recordings"
                desciption="Check out your recordings"
                handleClick={() => router.push('/recordings')}
                className="bg-[#830EF9]"
            />
            <HomeCard 
                img="/icons/join-meeting.svg"
                title="New Meeting"
                desciption="via invitation link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-[#F9A90E]"
            />

            {!CallDetails ? (
                <MeetingModel
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-[#ECF0FF]">Add a description</label>
                        <Textarea className="border-none bg-[#252A41] 
                            focus-visible:ring-0
                            focus-visible:ring-offset-0"
                            onChange={(e) => {
                                setvalues({...values,description: e.target.value})
                            }}/>
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-[#ECF0FF]">Select Date and Time</label>
                        <ReactDatePicker 
                            selected={values.dateTime}
                            onChange={(date) => setvalues({...values, dateTime: date!})}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full bg-[#252A41] p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModel>    
            ) : (
                <MeetingModel 
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Meeting Created"
                className="text-center"
                handleClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast('Link copied')
                }}
                image="/icons/checked.svg"
                buttonIcon="/icons/copy.svg"
                buttonText="Copy Meeting Link"
            />
            )}

            <MeetingModel 
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

            <MeetingModel 
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
            <Input 
                placeholder="Meeting link"
                className="border-none bg-[#252A41] focus-visible:ring-0 
                focus-visible:ring-offset-0"
                onChange={(e) => setvalues({ ...values, link:e.target.value})}
            />
            </MeetingModel>

        </section>
    )
}

export default MeetingTypeList