import React, {useEffect, useRef, useState} from "react";

import {base64ToURL} from "../../common/helpers/base64ToURL";
import LoadBox from "./components/load-box/load-box";
import style from "./components/load-box/load-box.module.css";
import {styleTransferProcess} from "./api/api";

import './machine-root.css';

export const STYLE = "styleImageKey";
export const TARGET = "targetImageKey";

export function MachineRoot() {
  const imageS = window.localStorage.getItem(STYLE) as string
  const imageT = window.localStorage.getItem(TARGET) as string

  const [chosen1, setChosen1] = useState(Boolean(imageT))
  const [chosen2, setChosen2] = useState(Boolean(imageS))
  const [srcFinal, setSrcFinal] = useState("")

  const clb1 = (hasImage: boolean) => setChosen1(hasImage)
  const clb2 = (hasImage: boolean) => setChosen2(hasImage)

  const styleTransfer = async () => {
    const resImageCode = await styleTransferProcess(imageT, imageS)
    const image = await base64ToURL(resImageCode)
    setSrcFinal(image)
  }

  const fullReset = () => {
    window.localStorage.setItem(TARGET, "")
    window.localStorage.setItem(STYLE, "")
    clb1(false)
    clb2(false)
    window.location.pathname = '/'
  }

  const addImageToUserList = () => {
    const was = window.localStorage.getItem("myStorage") as string
    const has = [...JSON.parse(was), srcFinal]
    window.localStorage.setItem("myStorage", JSON.stringify(has))
    alert("Картинка добавлена!")
    window.location.pathname = '/profile/man'
  }

  const condition: boolean = (chosen1 && chosen2)
  const condition2: boolean = Boolean(srcFinal)

  return (
    <>
      <div className="loadFieldSet">
        <LoadBox imgKey={TARGET} text="Ваша картинка" imageMess={clb1} key={Math.random()}/>
        <LoadBox imgKey={STYLE} text="Изображение стиля" imageMess={clb2} key={Math.random()}/>
        <div className="machineFinalWrapper">
          <div className="machineFinalContent">
            <div className={style.machineImageTitle}>Результат</div>
            <img src={srcFinal || undefined} className="machineFinalImage" alt=""/>
          </div>
          <div className="machineFinalPanel">
            <button
              onClick={fullReset}
              className={'btn btn-warning'}
            >
              Сбросить все
            </button>

            <button
              onClick={styleTransfer}
              className={`btn ${condition ? 'btn-primary' : 'btn-secondary'}`}
              disabled={!condition}
            >
              Перенести стиль
            </button>

            <button
              onClick={addImageToUserList}
              className={`btn ${condition2 ? 'btn-primary' : 'btn-secondary'}`}
              disabled={!condition2}
            >
              Добавить себе
            </button>

            <a
              className={`btn ${condition2 ? 'btn-success' : 'btn-secondary'}`}
              href={srcFinal}
              download={true}
            >
              Скачать
            </a>

            <div>
              <label> Степень переноса </label>
              <input type="range" min="0" max="200" defaultValue="200"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
