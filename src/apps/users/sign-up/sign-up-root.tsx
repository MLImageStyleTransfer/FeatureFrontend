import React, {useState} from "react";

import {ContentTitle} from "../../../common/components/content-title/content-title";

import style from './sign-up.module.css'

export const SignUpRoot = () => {
  return (
    <>
      <ContentTitle titleText="Регистрация" />
      <div className={style.authWrapper}>
        <div className={style.authBox}>
          <div className={style.authText}> Логин </div>
          <input type="text" className={style.authInput}/>
          <div className={style.authText}> Пароль </div>
          <input type="password" className={style.authInput}/>
          <br/>
          <button
            className='btn btn-primary'
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </>
  )
}