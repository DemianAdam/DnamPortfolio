export async function deleteVideo(r2Key: string) {
    const res = await fetch("/api/videos/delete", {
        method: "POST",
        body: JSON.stringify({
            r2Key: r2Key
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(!res.ok){
        throw new Error("Failed to delete the file");
    }
}