import React, {useEffect, useState} from 'react'

import {Api} from '../api/api'

import ContentBox from '../components/content-box/content-box'
import LoadBox from '../components/load-box/load-box'
import {base64ToURL} from '../common/helpers/base64ToURL'
import {blobToBase64} from '../common/helpers/URLToBase64'

import {AppStorage, ClientStorage} from '../storage/types'
import {initialState} from '../storage/init'

import './App.css'

function App() {
  const clientStorage: ClientStorage = window.localStorage
  const [appStorage, setAppStorage] = useState<AppStorage>(initialState)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (clientStorage.hasOwnProperty('loadedImage')) {
      setIsLoaded(true)
      setAppStorage(oldAppStorage => ({
        ...oldAppStorage,
        image: clientStorage.getItem('loadedImage') || ''
      }))
    }
  }, [])

  //@ts-ignore
  const loadImage = async (ref) => {
    let file = ref?.current.files[0];
    if (file) {
      const url = await blobToBase64(file)
      setAppStorage(oldAppStorage => ({
        ...oldAppStorage,
        image: url
      }))
      setIsLoaded(() => {
        clientStorage.setItem('loadedImage', url)
        return true
      })
    }
  }

  const stopEdit = () => {
    setAppStorage(initialState)
    setIsLoaded(() => {
      clientStorage.removeItem('loadedImage')
      return false
    })
  }

  const transformationFlow = async (newAppStorage: AppStorage) => {
    let currentImage = (clientStorage.getItem('loadedImage') || '')

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
            return response.text()
          })
          //@ts-ignore
          .then(data => {
            console.log("OK")
            return data
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

  return (
    <div className="App">
      {isLoaded
        ? <ContentBox stopEdit={stopEdit}
                      image={appStorage.image}
                      transform={transform}
                      appStorage={appStorage}/>
        : <LoadBox loadImage={loadImage}/>
      }
    </div>
  );
}

export default App
