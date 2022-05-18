import React from "react";

import {ContentTitle} from "../content-title/content-title";
import {MachineRoot} from "../../../apps/machine/machine-root";

export const Home = () => {
  return (
    <div>
      <ContentTitle titleText="Главная"/>
      <MachineRoot />
    </div>
  )
}