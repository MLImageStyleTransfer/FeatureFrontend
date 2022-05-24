import {AppStorage, ClientStorage} from "./storage/types";
import React, {useEffect, useState} from "react";
import {initialState} from "./storage/init";
import {Api} from "./api/api";
import {base64ToURL} from "../../common/helpers/base64ToURL";
import ContentBox from "./components/content-box/content-box";

type Props = {
  imgKey: string
  stopEdit: () => void
}

export const FeatureRoot = ({imgKey, stopEdit}: Props) => {
  const clientStorage: ClientStorage = window.localStorage
  const [appStorage, setAppStorage] = useState<AppStorage>(initialState)

  useEffect(() => {
    setAppStorage((old: AppStorage) => ({
      ...old,
      image: clientStorage.getItem(imgKey) as string,
    }))
  }, [])

  const transformationFlow = async (newAppStorage: AppStorage) => {
    let currentImage = clientStorage.getItem(imgKey) || ''

    for (const [changeType, changeBody] of Object.entries(newAppStorage.params)) {
      if (changeBody) {
        //@ts-ignore
        currentImage = await Api[changeType as keyof Api]({
          image_code: currentImage,
          params: changeBody
        })
          //@ts-ignore
          .then(response => {
            if (!response.ok || response.status !== 200) {
              return currentImage
            }
            return response.json()
          })
          //@ts-ignore
          .then(data => {
            console.log(`[--OK--] ${changeType}\n`)
            return data.image_code
          })
          .catch(() => {
            console.warn("Error")
            return currentImage
          })
      }
    }

    return currentImage
  }

  const transform = async (newAppStorage: AppStorage) => {
    const newImage = await transformationFlow(newAppStorage)
    newAppStorage.image = await base64ToURL(newImage)
    setAppStorage(newAppStorage)
  }

  const stopEditHere = async () => {
    localStorage.setItem(imgKey, appStorage.image)
    stopEdit()
  }

  return (
    <ContentBox
      stopEdit={stopEditHere}
      image={appStorage.image}
      transform={transform}
      appStorage={appStorage}
    />
  );
}
