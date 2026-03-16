"use client"

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Test() {
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const { data: session } = useSession();
  console.log("-------------SESSION:\n", session)

  const query = useQuery(api.video.queries.getVideoById, { id: "k17d317gftysmys45nvqg2q90x82wcze" });

  console.log("-------------VIDEO:\n", query);

  const handleClick = async () => {
    /*const res = await fetch(`/api/videos/${query?.id}/stream`);

    const { url } = await res.json()
    console.log("------------- RESPONSE:\n", url);*/

    setVideoSrc(`/api/videos/${query?.id}/stream`)
  }
  return (
    <div>
      <button onClick={handleClick}>Click!</button>
      <video src={videoSrc} onError={()=> console.log("Error")} controls={true}></video>
    </div>
  )
}