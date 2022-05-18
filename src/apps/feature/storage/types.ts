// is_changed
export type GrayscalerBody = {
  is_grayscaled: boolean
}

// in Photo bounds
export type CropperBody = {
  left_upper: [number, number]
  right_lower: [number, number]
}

// contrast_factor -> double in [0; 2]
export type ContrastEditorBody = {
  contrast_factor: number
}

// colorfulness_factor -> double in [0; 2]
export type ColorfulnessEditorBody = {
  colorfulness_factor: number
}

// brightness_factor -> double in [0; 2]
export type BrightnessEditorBody = {
  brightness_factor: number
}

export type OnOfBody =
  GrayscalerBody |
  CropperBody |
  ColorfulnessEditorBody |
  ContrastEditorBody |
  BrightnessEditorBody

export type AppStorage = {
  image: string
  params: {
    grayscaler?: GrayscalerBody
    cropper?: CropperBody
    contrastEditor?: ContrastEditorBody
    colorfulnessEditor?: ColorfulnessEditorBody
    brightnessEditor?: BrightnessEditorBody
  }
}

export type ClientStorage = Storage