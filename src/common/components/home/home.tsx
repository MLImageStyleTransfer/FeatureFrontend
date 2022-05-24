import React, {useEffect, useState} from "react";

import {ContentTitle} from "../content-title/content-title";
import {MachineRoot, STYLE} from "../../../apps/machine/machine-root";

import styles from './home.module.css'
import {EngineApi} from '../../api/api'
import {SecondaryTitle} from "../secondary-title/secondary-title";

const DefaultStyleImages = ({array, reload}: {
  array: string[]
  reload: () => void
}) => {
  const onStyleClick = (url: string) => {
    window.localStorage.setItem(STYLE, url)
    reload()
  }

  return (
    <div className={styles.styleImagesList}>
      {array.map((imageUrl, id) => (
        <div className={styles.styleImageWrapper} key={id}>
          {imageUrl && <img
              src={imageUrl}
              className={styles.styleImage}
              onClick={() => onStyleClick(imageUrl)}
              alt=""
          />}
        </div>
      ))}
    </div>
  )
}

const TextInfoAboutStyleChose = () => {
  return (
    <div className={styles.textInfoAboutStyleChose}>
      Вы можете выбрать изображение стиля из предложенных, кликнув по нему, либо загрузить свое.
    </div>
  )
}

export const Home = () => {
  const [styleImages, setStyleImages] = useState<string[]>([])
  const [changer, reload] = useState(false)

  const reloadCallback = () => {
    reload(!changer)
  }

  useEffect(() => {
    EngineApi.getStylePictures().then(data => {
      setStyleImages(data)
    })
  }, [])

  // console.table(styleImages.length)

  return (
    <>
      <ContentTitle titleText="Главная" />
      <SecondaryTitle text="Стандартные изображения стилей" />
      <DefaultStyleImages array={styleImages} reload={reloadCallback}/>
      <TextInfoAboutStyleChose />
      <SecondaryTitle text="Перенос стиля" />
      {(changer ? changer : true) && <MachineRoot key={Number(changer)}/>}
    </>
  )
}