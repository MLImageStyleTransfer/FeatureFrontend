import React from 'react'

import {AppStorage} from '../../storage/types'
import {deepClone} from '../../storage/helpers/deepClone'

import style from './content-box.module.css'

//@ts-ignore
const ImageStyleManager = ({contrast, bright}) => {
  return (
    <>
      <div className={style.settItem}>
        <label className={style.contrast}> Контраст </label>
        <input
          type="range"
          min="0"
          max="200"
          defaultValue="100"
          onMouseUpCapture={contrast}
        />
      </div>
      <div className={style.settItem}>
        <label className={style.contrast}> Яркость </label>
        <input
          type="range"
          min="0"
          max="200"
          defaultValue="100"
          onMouseUpCapture={bright}
        />
      </div>
      <div className={style.settItem}>
        <label className={style.contrast}> Насыщенность </label>
        <input
          type="range"
          min="0"
          max="200"
          defaultValue="100"
        />
      </div>
      <div className={style.settItem}>
        <label className={style.contrast}> Левый верхний угол </label>
        <input type="range" min="0" max="200" style={{width: "60px", marginLeft: "5px"}} defaultValue="0"/>
        <input type="range" min="0" max="200" style={{width: "60px", marginLeft: "5px"}} defaultValue="0"/>
      </div>
      <div className={style.settItem}>
        <label className={style.contrast}> Правый нижний угол </label>
        <input type="range" min="0" max="200" style={{width: "60px", marginLeft: "5px"}}  defaultValue="200"/>
        <input type="range" min="0" max="200" style={{width: "60px", marginLeft: "5px"}}  defaultValue="200"/>
      </div>
    </>
  )
}

type Props = {
  image?: string
  stopEdit: () => void
  transform: (newAppStorage: AppStorage) => Promise<void>
  appStorage: AppStorage
}

export default function ContentBox({
  image,
  stopEdit,
  transform,
  appStorage,
}: Props) {
  let local: AppStorage = deepClone(appStorage)

  const contrast = (event: any) => {
    local.params.contrastEditor = {contrast_factor: event?.target?.value as number}
    transform(local)
  }

  const bright = (event: any) => {
    local.params.brightnessEditor = {brightness_factor: event?.target?.value as number}
    transform(local)
  }

  const blackWhite = () => {
    local.params.grayscaler = {
      is_grayscaled: !Boolean(local.params.grayscaler?.is_grayscaled)
    }
    transform(local)
  }

  return (
    <div className={style.ground}>
      <div className={style.content}>
        <div className={style.header}>Редактор</div>
        <div className={style.imageWrapper}>
          {Boolean(image) && <img
              src={image}
              alt="fun"
              className={style.image}
          />}
        </div>

        <ImageStyleManager contrast={contrast} bright={bright}/>

        <div className={style.manage}>

          <div className={`${style.customSize} input-group`}>
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input
                  onChange={blackWhite}
                  checked={local.params.grayscaler?.is_grayscaled}
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                />
              </div>
            </div>
            <label className="form-control" aria-label="Text input with checkbox">
              Черно-белый фильтр
            </label>
          </div>

          <button
            onClick={stopEdit}
            className="btn btn-success"
          >
            Завершить
          </button>
        </div>


      </div>
    </div>
  )
}