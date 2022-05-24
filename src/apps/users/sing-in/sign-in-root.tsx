import React, {useState} from "react";

import {ContentTitle} from "../../../common/components/content-title/content-title";
import style from "../sign-up/sign-up.module.css";

import userPict from '../../../common/static/images/user_has.jpg'

const LOGIN = "test_user"
const PASSWORD = "parol123"

const checker = (log: string, pass: string): boolean => (log === LOGIN && pass === PASSWORD)

export const SignInRoot = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [cond, setCond] = useState(false)

  const onLogin = (event: any) => {
    setLogin(event.target.value)
    setCond(checker(event.target.value, password))
  }

  const onPassword = (event: any) => {
    setPassword(event.target.value)
    setCond(checker(login, event.target.value))
  }

  const doAuth = () => {
    window.localStorage.setItem("myStorage", JSON.stringify([userPict]))
    window.localStorage.setItem("login", login)
    window.location.pathname = '/profile/man/'
  }

  return (
    <>
      <ContentTitle titleText="Авторизация" />
      <div className={style.authWrapper}>
        <div className={style.authBox}>
          <div className={style.authText}> Логин </div>
          <input
            type="text"
            className={style.authInput}
            value={login}
            onChange={onLogin}
          />
          <div className={style.authText}> Пароль </div>
          <input
            type="password"
            className={style.authInput}
            value={password}
            onChange={onPassword}
          />
          <br/>
          <button
            className={`btn ${cond ? 'btn-success' : 'btn-secondary'}`}
            disabled={!cond}
            onClick={doAuth}
          >
            Авторизоваться
          </button>
        </div>
      </div>
    </>
  )
}