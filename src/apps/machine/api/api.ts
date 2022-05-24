export const styleTransferProcess = async (
  image1: string | null,
  image2: string | null
) =>
  fetch('http://127.0.0.1:5555/style_transfer/', {
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