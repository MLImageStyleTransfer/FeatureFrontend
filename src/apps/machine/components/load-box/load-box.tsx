import React, {useRef, useState} from 'react'
import {blobToBase64} from "../../../../common/helpers/URLToBase64";

import style from './load-box.module.css'
import {FeatureRoot} from "../../../feature/feature-root";

type Props = {
  text: string
  imgKey: string
  imageMess: (hasImage: boolean) => void
}

export default function LoadBox({imgKey, text, imageMess}: Props) {
  const [edit, setEdit] = useState(false)
  const [chosen, setChosen] = useState<boolean>(Boolean(localStorage.getItem(imgKey)))
  const ref = useRef(null)

  const checker = async () => {
    const cond: boolean = Boolean((ref?.current || {files: [false]}).files[0])
    //@ts-ignore
    let file = ref?.current.files[0];
    if (cond && file) {
      const url = await blobToBase64(file)
      window.localStorage.setItem(imgKey, url)
    }
    setChosen(false)
    setChosen(() => {
      imageMess(cond)
      return cond
    })
  }

  const onEdit = () => {
    setEdit(true)
  }

  const stopEdit = () => {
    setEdit(false)
  }

  return (
    <>
      {edit && <FeatureRoot stopEdit={stopEdit} imgKey={imgKey}/>}
      <div className={style.machineLoadWrapper}>
        <div className={style.machineImageTitle}>
          {text}
        </div>
        <img
          src={chosen && window?.localStorage.getItem(imgKey) || undefined}
          className={style.machineImage}
          alt=""
        />
        <input
          onInput={checker}
          type="file"
          ref={ref}
          className={style.machineLoadButton}
        />
        <button
          onClick={onEdit}
          className={`btn ${chosen ? 'btn-primary' : 'btn-secondary'}`}
          disabled={!chosen}
        >
          Редактировать
        </button>
      </div>
    </>
  )
}