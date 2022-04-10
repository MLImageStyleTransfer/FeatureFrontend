import {
  AppStorage,
  BrightnessEditorBody,
  ColorfulnessEditorBody,
  ContrastEditorBody,
  CropperBody,
  GrayscalerBody,
  OnOfBody
} from '../types'

const cloneSimpleObject = (object?: OnOfBody) => (
  Object.entries(object || {}).reduce((accum, item) => {
    return {...accum, [item[0]]: item[1]}
  }, {})
)

export const deepClone = (storage: AppStorage): AppStorage => {
  const link = storage.params

  return {
    image: storage.image,
    params: {
      grayscaler: link?.grayscaler && cloneSimpleObject(link?.grayscaler) as GrayscalerBody,
      cropper: link?.cropper && cloneSimpleObject(link?.cropper) as CropperBody,
      contrastEditor: link?.contrastEditor && cloneSimpleObject(link?.contrastEditor) as ContrastEditorBody,
      colorfulnessEditor: link?.colorfulnessEditor && cloneSimpleObject(link?.colorfulnessEditor) as ColorfulnessEditorBody,
      brightnessEditor: link?.brightnessEditor && cloneSimpleObject(link?.brightnessEditor) as BrightnessEditorBody,
    }
  }
}
