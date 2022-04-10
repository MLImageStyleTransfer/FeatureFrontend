import React, {useRef, useState} from 'react'

type Props = {
  loadImage: (ref: any) => void
}

export default function LoadBox({loadImage}: Props) {
  const [chosen, setChosen] = useState<boolean>(false)

  const ref = useRef(null)

  const checker = () => {
    if ((ref?.current || {files: [false]}).files[0]) {
      setChosen(true)
    } else {
      setChosen(false)
    }
  }

  return (
    <fieldset title="LOAD FORM">
      <input onInput={checker} type="file" id="file" ref={ref}/>
      <button
        onClick={() => loadImage(ref)}
        className={`btn ${chosen ? 'btn-primary' : 'btn-secondary'}`}
        disabled={!chosen}
      >
        Редактировать
      </button>
    </fieldset>
  )
}