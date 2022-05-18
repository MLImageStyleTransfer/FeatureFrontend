import React from 'react';

import err from '../../static/images/error.png';

import style from './not-found.module.css';
import {ContentTitle} from "../content-title/content-title";

export const NotFound = () => {
  return (
    <React.StrictMode>
      <ContentTitle titleText="К сожалению такой страницы у нас нет..." />
      <div className={style.aroundErr}>
        <img className={style.errImage1} src={err} alt="404"/>
        <img className={style.errImage2} src={err} alt="404"/>
      </div>
    </React.StrictMode>
  );
}
