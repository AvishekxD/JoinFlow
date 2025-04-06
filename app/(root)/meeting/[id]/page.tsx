import MeetingClient from './MeetingClient';

// Update PageProps to match Next.js internal types
interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: PageProps) {
  // Await the params since it's a Promise
  const resolvedParams = await params;
  return <MeetingClient meetingId={resolvedParams.id} />;
}