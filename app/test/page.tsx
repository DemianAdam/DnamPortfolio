"use client"
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function Test() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const query = useQuery(api.video.queries.getVideoById, {
    id: "k17ckr4wzwwb3zvkxr82j7sdcd84bw3r"
  });

  const handleClick = async () => {
    //setVideoSrc(`/api/videos/${query?.id}/stream`);
     const res = await fetch(`/api/videos/${query?.id}/stream`);
     const data = await res.json();
 
     console.log("DATAAAA\n",data.data.url)
     if (data.success) {
       setVideoSrc(data.data.url);
     }
     else{
       setError("Failed to fetch video stream URL");
     }

  };

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;

    const video = videoRef.current;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = videoSrc;
    } else if (Hls.isSupported()) {
      console.log("Using HLS.js to play the video");
      const hls = new Hls();
      console.log("Loading video source:", videoSrc);
      hls.loadSource(videoSrc);
      console.log("Attaching media...");
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }
  }, [videoSrc]);

  return (
    <div>
      <button onClick={handleClick}>Click!</button>
      <video
        ref={videoRef}
        controls
        onError={() => console.log("Video error")}
        style={{ width: "600px" }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}