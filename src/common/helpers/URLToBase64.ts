import {createBlob} from './createBlob'

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  });
}

export async function URLToBase64(url: string): Promise<string> {
  const blob = await createBlob(url)
  return (await blobToBase64(blob))
}