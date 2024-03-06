import { NasaObject } from '../App'

export const setToLocal = (favs: NasaObject[], stateSetter: (toSet: NasaObject[]) => void) => {
  localStorage.setItem('favs', JSON.stringify(favs))
  stateSetter(favs)
}
