export function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");

    video.preload = "metadata";
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {

      window.URL.revokeObjectURL(video.src);
      resolve(Math.round(video.duration));
    };

    video.onerror = () => {
      reject("Failed to read video metadata");
    };
  });
}