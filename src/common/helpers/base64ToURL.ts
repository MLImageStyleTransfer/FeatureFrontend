import {createBlob} from './createBlob'

export async function base64ToURL(file: string): Promise<string> {
  const need = file.slice(3, file.length - 3)
  const blob = await createBlob(`data:image/jpeg;base64,${need}`)
  return URL.createObjectURL(blob)
}
