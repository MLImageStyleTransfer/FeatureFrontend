import React from 'react'

import {AppStorage} from '../../storage/types'
import {deepClone} from '../../storage/helpers/deepClone'

import style from './content-box.module.css'

//@ts-ignore
const ImageStyleManager = ({contrast}) => {
  return (
    <div>
      <label className={style.contrast}> Контраст </label>
      <input
        type="text"
        onChange={contrast}
      />
    </div>
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
    local.params.contrastEditor = {
      contrast_factor: event?.target?.value as number
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

        <ImageStyleManager contrast={contrast}/>

        <div className={style.manage}>

          <div className={`${style.customSize} input-group`}>
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input
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
            className="btn btn-warning"
          >
            Отмена
          </button>

          <button
            onClick={() => {alert("Увы, пока что сохранение не работает...")}}
            className="btn btn-success"
          >
            Сохранить
          </button>
        </div>


      </div>
    </div>
  )
}