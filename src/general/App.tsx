import React, {useEffect, useState} from 'react'
import './App.css'

import ContentBox from '../components/content-box/content-box'
import LoadBox from '../components/load-box/load-box'
import {Api} from '../api/api'
import {base64ToURL} from '../common/helpers/base64ToURL'
import {blobToBase64} from '../common/helpers/URLToBase64'

function App() {
  const myStorage = window.localStorage

  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [image, setImage] = useState<string>('')
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    if (myStorage.hasOwnProperty('currImage')) {
      setIsLoaded(true)
      setImage(myStorage.getItem('currImage') || '')
    }
  }, [])

  //@ts-ignore
  const loadImage = async (ref) => {
    let file = ref?.current.files[0];
    if (file) {
      const url = await blobToBase64(file)
      setImage(url)
      setIsLoaded(() => {
        myStorage.setItem('currImage', url)
        myStorage.setItem('greyImage', '')
        return true
      })
    }
  }

  const stopEdit = () => {
    setImage('')
    setIsLoaded(() => {
      myStorage.removeItem('currImage')
      myStorage.removeItem('greyImage')
      setChecked(false)
      return false
    })
  }

  const grayscaleTransform = async () => {
    if (myStorage.getItem('greyImage')?.length) {
      return
    }

    return Api.recolor({image: image})
      .then(data => data.text())
      .then(async (file) => {
        const url = await base64ToURL(file)
        myStorage.setItem('greyImage', url)
        console.log("OK")
      })
      .catch(error => {
        console.error(error)
      })
  }

  const transform = async () => {
    grayscaleTransform().then(() => {
      if (!checked) {
        setImage(() => {
          setChecked(true)
          return myStorage.getItem('greyImage') || ''
        })
      } else {
        setImage(() => {
          setChecked(false)
          return myStorage.getItem('currImage') || ''
        })
      }
    })
  }

  return (
    <div className="App">
      {isLoaded
        ? <ContentBox stopEdit={stopEdit}
                      image={image}
                      transform={transform}
                      checked={checked}/>
        : <LoadBox loadImage={loadImage}/>
      }
    </div>
  );
}

export default App
