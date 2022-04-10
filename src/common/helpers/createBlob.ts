export async function createBlob(someUrl: string): Promise<Blob> {
  const response = await fetch(someUrl)
  return await response.blob()
}