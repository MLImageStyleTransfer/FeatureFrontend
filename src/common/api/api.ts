import stImg0 from '../static/images/stImg0.jpg'
import stImg1 from '../static/images/stImg1.jpg'
import stImg2 from '../static/images/stImg2.jpg'
import stImg3 from '../static/images/stImg3.jpg'
import stImg4 from '../static/images/stImg4.jpg'
import {base64ToURL} from "../helpers/base64ToURL";

export const EngineApi = {
  getStylePictures: async () => {
    return new Promise<Array<string>>(async (resolve, reject) => {
      const timer = setTimeout(() => {
        resolve(
          ([stImg0, stImg1, stImg2, stImg3, stImg4].reduce((acc, item) => (
            [...acc, item]
          ), [] as string[]))
        )
      }, 1)
    })
  }
}
