import React, {useEffect} from "react";

import style from './about.module.css'
import {ContentTitle} from "../content-title/content-title";

const frame = "http://127.0.0.1:3010/StyleTransferAbout.html";

export function About() {
  useEffect(() => {
    const element = document.getElementById("aboutFrameSource")
    //@ts-ignore
    element.src = frame
  })

  return (
    <>
      <ContentTitle titleText="Об Алгоритме" />
      <div className={style.aboutFrameWrapper}>
        <iframe
          id="aboutFrameSource"
          className={style.aboutFrame}
          loading="lazy"
        />
      </div>
    </>
  )
}