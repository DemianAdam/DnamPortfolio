export function logApi(event: string, data: Record<string, unknown>) {
  console.log(
    JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      ...data
    })
  )
}