// import environment from 'dotenv'
// import {DEFAULT_PORT} from './constants'
import {Config, RawConfig} from './types'

export const config: Config = {
  // port: (environment as RawConfig)?.SERVICE_PORT || DEFAULT_PORT
  port: '5000'
}