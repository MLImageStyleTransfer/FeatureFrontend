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

export const deepClone = (storage: AppStorage): AppStorage => ({
  image: storage.image,
  params: {
    grayscaler: cloneSimpleObject(storage.params?.grayscaler) as GrayscalerBody,
    cropper: cloneSimpleObject(storage.params?.cropper) as CropperBody,
    contrastEditor: cloneSimpleObject(storage.params?.contrastEditor) as ContrastEditorBody,
    colorfulnessEditor: cloneSimpleObject(storage.params?.colorfulnessEditor) as ColorfulnessEditorBody,
    brightnessEditor: cloneSimpleObject(storage.params?.brightnessEditor) as BrightnessEditorBody,
  }
})
