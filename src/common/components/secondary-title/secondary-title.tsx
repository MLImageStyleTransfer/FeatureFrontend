import React from "react";

import style from './secondary-title.module.css'

export const SecondaryTitle = ({text}: {text: string}) => {
  return (
    <div className={style.secondaryTitle}>
      {text}
    </div>
  )
}