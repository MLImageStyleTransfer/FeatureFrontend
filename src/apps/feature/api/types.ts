export type RawConfig = {
  SERVICE_PORT?: string
}

export type Config = {
  port: string
}

export type RequestBodyType = {
  image_code: string
  params?: Object
}
