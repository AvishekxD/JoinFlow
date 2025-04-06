"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { avatarImages } from "@/constants";
import { toast} from "sonner";


interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
 
    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-[#1C1F2E]
            px-5 py-8 xl:max-w-[568px]">
            <article className="flex flex-col gap-5">
                <Image src={icon} alt="upcoming" width={28}
                    height={28}/>
                <div className=" flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                            {title}
                        </h1>
                        <p className="text-base font-normal">
                            {date}
                        </p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative", {})}>
                <div className="relative flex w-full max-sm:hidden">
                    {avatarImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt="attendees"
                            width={40}
                            height={40}
                            className={cn("rounded-full", {absolute: index > 0 })}
                            style={{ top: 0, left: index * 28 }}
                        />
                    ))}
                    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-[#252A41]
                        bg-[#1C1F2E]">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick}
                            className="rounded bg-[#0E78F9] px-6">
                            {buttonIcon1 && (
                                <Image src={buttonIcon1} alt="feature"
                                    width={20} height={20} />
                            )}
                            &nbsp; {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast("Link Copied");
                            }}
                            className="bg-[#1C1F2E] px-6"
                        >
                            <Image
                                src="/icons/copy.svg"
                                alt="feature"
                                width={20}
                                height={20}
                            />
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    )
}

export default MeetingCard