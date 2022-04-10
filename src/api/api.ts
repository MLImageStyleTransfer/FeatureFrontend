import {config} from './config'

import {BASE_URL,URLProvider} from './constants'

import {RequestBodyType} from './types'

export const Api = {
  grayscaler(request: RequestBodyType): Promise<any> {
    return ApiHelper.apiFetch(ApiHelper.buildURL(URLProvider.GRAYSCALE_URL), request)
  },

  cropper(request: RequestBodyType): Promise<any> {
    return ApiHelper.apiFetch(ApiHelper.buildURL(URLProvider.CROPPER_URL), request)
  },

  contrastEditor(request: RequestBodyType): Promise<any> {
    return ApiHelper.apiFetch(ApiHelper.buildURL(URLProvider.CONTRAST_EDITOR_URL), request)
  },

  colorfulnessEditor(request: RequestBodyType): Promise<any> {
    return ApiHelper.apiFetch(ApiHelper.buildURL(URLProvider.COLORFULNESS_EDITOR_URL), request)
  },

  brightnessEditor(request: RequestBodyType): Promise<any> {
    return ApiHelper.apiFetch(ApiHelper.buildURL(URLProvider.BRIGHTNESS_EDITOR_URL), request)
  },
}

const ApiHelper = {
  buildURL(apiURL: string): string {
    return `${BASE_URL}${config.port}/api${apiURL}`
  },

  apiFetch(url: string, body: RequestBodyType) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
}