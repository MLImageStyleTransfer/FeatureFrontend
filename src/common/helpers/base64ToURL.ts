import {createBlob} from './createBlob'

export async function base64ToURL(file: string): Promise<string> {
  const need = file.slice(2, file.length - 1)
  const blob = await createBlob(`data:image/jpeg;base64,${need}`)
  return URL.createObjectURL(blob)
}
