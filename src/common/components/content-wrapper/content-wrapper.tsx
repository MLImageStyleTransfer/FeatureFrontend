import React from "react";

import style from './content-wrapper.module.css'

type Props = {
  children: React.ReactNode
}

export function ContentWrapper({children}: Props) {
  return (
    <div className={style.contentWrapper}>
      {children}
    </div>
  )
}