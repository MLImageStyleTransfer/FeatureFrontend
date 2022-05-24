import React from "react";

import {ContentTitle} from "../../../common/components/content-title/content-title";
import {SecondaryTitle} from "../../../common/components/secondary-title/secondary-title";

import style from './account-root.module.css'

const SavedStyleImages = ({array}: {
  array: string[]
}) => {
  const remove = (url: string) => {
    const was = window.localStorage.getItem("myStorage") as string
    const has = JSON.parse(was).filter((item: string) => item !== url)
    window.localStorage.setItem("myStorage", JSON.stringify(has))
    alert("Картинка удалена!")
    window.location.pathname = '/profile/man'
  }

  if (array.length === 0) {
    return (
      <div className={style.savedList}>
        <div style={{fontSize: "22px"}}>
          Вы пока ничего не сохранили 🙁
        </div>
      </div>
    )
  }

  return (
    <div className={style.savedList}>
      {array.map((imageUrl, id) => (
        <div className={style.savedWrapper} key={id}>
          <img
              src={imageUrl}
              className={style.savedImage}
              alt=""
          />
          <div className={style.saveButWrap}>
            <a className="btn btn-primary" href={imageUrl} download={true}>
              Скачать
            </a>
          </div>
          <div className={style.saveButWrap}>
            <button className="btn btn-danger" onClick={() => remove(imageUrl)}>
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export const AccountRoot = () => {
  const isAuth = Boolean(localStorage.getItem("login"))
  const login = String(localStorage.getItem("login"))

  const logout = () => {
    window.localStorage.setItem("login", "")
    window.location.pathname = "/"
  }

  if (!isAuth) {
    return (
      <>
        <ContentTitle titleText="Профиль" />
        <SecondaryTitle text="Чтобы просматривать профиль необходимо войти!"/>
      </>
    )
  }

  //@ts-ignore
  const arr: string[] = JSON.parse(window.localStorage.getItem("myStorage"))
  console.log(arr)

  return (
    <>
      <ContentTitle titleText="Профиль" />
      <SecondaryTitle text={"Ваш логин: " + login}/>
      <SecondaryTitle text={"Ваши сохраненные изображения отображены в разделе ниже "}/>

      <SavedStyleImages array={arr}/>
      <button
        className='btn btn-warning'
        onClick={logout}
      >
        Выйти
      </button>
    </>
  )
}