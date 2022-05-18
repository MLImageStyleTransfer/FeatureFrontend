import React from "react";

import style from './content-title.module.css'

type Props = {
  titleText: string
}

export const ContentTitle = ({titleText}: Props) => {
  return (
    <div className={style.contentTitleWrapper}>
      <h1 className={style.contentTitle}>
        {titleText}
      </h1>
    </div>
  )
}
