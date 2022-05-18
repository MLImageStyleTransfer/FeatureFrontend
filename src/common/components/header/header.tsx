import React from "react";

import {Link} from 'react-router-dom'

import style from './header.module.css'

export function Header() {
  return (
    <div className={style.headerWrapper}>
      <div className={style.navGroup}>
        <Link className={style.headerLink} to="/"> Главная </Link>
        <Link className={style.headerLink} to="/about"> Об алгоритме </Link>
        <Link className={style.headerLink} to="/profile/man"> Профиль </Link>
      </div>
      <div className={style.authGroup}>
        <Link className={style.headerLink} to="/sign-in"> Войти </Link>
        <Link className={style.headerLink} to="/sign-up"> Зарегистрироваться </Link>
      </div>
    </div>
  )
}