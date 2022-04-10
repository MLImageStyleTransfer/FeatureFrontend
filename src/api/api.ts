import {config} from './config'

import {BASE_URL, RECOLOR_URL} from './constants'

import {RequestType} from './types'

export class Api {
  public static recolor(request?: RequestType): Promise<any> {
    return fetch(Api.buildURL(), {
      method: 'POST',
      headers: {
        'Content-type': 'image/jpeg'
      },
      body: JSON.stringify(request?.image)
    })
  }

  private static buildURL(): string {
    return `${BASE_URL}${config.port}${RECOLOR_URL}`
  }
}