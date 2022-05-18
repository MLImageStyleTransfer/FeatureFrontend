import React, {useRef, useState} from "react";

import './machine-root.css'
import {blobToBase64} from "../../common/helpers/URLToBase64";
import {base64ToURL} from "../../common/helpers/base64ToURL";

export function MachineRoot() {
  const [chosen1, setChosen1] = useState(0)
  const [chosen2, setChosen2] = useState(0)

  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [srcFinal, setSrcFinal] = useState("")

  const ref1 = useRef(null)
  const ref2 = useRef(null)

  const checker1 = async () => {
    const cond: boolean = Boolean((ref1?.current || {files: [false]}).files[0])
    setChosen1(cond ? 1 : 0)
    //@ts-ignore
    let file = ref1?.current.files[0];
    if (cond && file) {
      const url = await blobToBase64(file)
      setImage1(url)
    }
  }

  const checker2 = async () => {
    const cond: boolean = Boolean((ref2?.current || {files: [false]}).files[0])
    setChosen2(cond ? 1 : 0)
    //@ts-ignore
    let file = ref2?.current.files[0];
    if (cond && file) {
      const url = await blobToBase64(file)
      setImage2(url)
    }
  }

  const styleTransfer = async () => {
    const resImageCode = await fetch('http://127.0.0.1:5555/style_transfer/', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          content_image_code: image1,
          style_image_code: image2,
          params: {
            transfer_coefficient: 1
          }
        })
      }).then(response => {
        return response.json()
      }).then(data => {
        console.log(`[--OK--] StyleTransfer\n`)
        return data.image_code
      }).catch(error => {
        console.warn(error)
      })

    const image = await base64ToURL(resImageCode)
    setSrcFinal(image)
  }

  const condition: boolean = (chosen1 + chosen2 === 2)

  return (
    <fieldset title="LOAD FORM">
      <div className="loadFieldSet">
        <input onInput={checker1} type="file" ref={ref1}/>
        <input onInput={checker2} type="file" ref={ref2}/>
        <button
          onClick={styleTransfer}
          className={`btn ${condition ? 'btn-primary' : 'btn-secondary'}`}
          disabled={!condition}
        >
          Перенести стиль
        </button>
      </div>
      <div className="imageWrapSt">
        <img
          src={srcFinal}
          alt="Ожидайте переноса..."
        />
      </div>
    </fieldset>
  )
}
