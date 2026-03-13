"use client"

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useSession } from 'next-auth/react';

export default function Test() {
  const { data: session } = useSession();
  console.log("-------------SESSION:\n", session)

  const query = useQuery(api.video.queries.getVideoById, { id: "k1746btzc5vj8qsfqhcdvyvp3x82mf67" });

  console.log("-------------VIDEO:\n", query);



  const handleClick = async () => {
    const res = await fetch(`/api/videos/${query?.id}/stream`);

    const json = await res.json()
    console.log("------------- RESPONSE:\n", json);
  }
  return (
    <div>
      <button onClick={handleClick}>Click!</button>
    </div>
  )
}
