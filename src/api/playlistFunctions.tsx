import { is, isArrayOf } from 'ts-guardian'
import { PlayList } from '../App'

export const isNasaObject = is({
  date: is('string'),
  explanation: is('string').or('undefined'),
  hdurl: is('string').or('undefined'),
  media_type: is('string').or('undefined'),
  title: is('string'),
})
export const isPlaylist = is({ name: is('string'), id: is('string'), list: isArrayOf(isNasaObject) })

export const loadPlaylists = () => {
  const retrievedPlaylists = localStorage.getItem('Playlists')

  if (!retrievedPlaylists || isArrayOf(isPlaylist)(JSON.parse(retrievedPlaylists)) === false) {
    localStorage.setItem('Playlists', JSON.stringify([{ name: 'Favourites', id: crypto.randomUUID(), list: [] }]))
    const toParse = localStorage.getItem('Playlists')
    if (typeof toParse === 'string') {
      const retrievedWithFavs = JSON.parse(toParse)
      if (isArrayOf(isPlaylist)(retrievedWithFavs)) {
        return retrievedWithFavs
      }
    }
  }
  if (retrievedPlaylists !== null) {
    return JSON.parse(retrievedPlaylists)
  }
}

export const updateOrAddPlaylist = (playlistToUpdate: PlayList) => {
  const loadedPlaylists = loadPlaylists()

  if (isArrayOf(isPlaylist)(loadedPlaylists)) {
    const oldPlaylistIndex = loadedPlaylists.findIndex(playList => {
      return playList.id === playlistToUpdate.id
    })
    if (oldPlaylistIndex === -1) {
      localStorage.setItem('Playlists', JSON.stringify([...loadedPlaylists, playlistToUpdate]))

      return
    }

    loadedPlaylists[oldPlaylistIndex] = { ...loadedPlaylists[oldPlaylistIndex], ...playlistToUpdate }

    localStorage.setItem('Playlists', JSON.stringify(loadedPlaylists))
  }
}

export const deletePlaylist = (playlistToDelete: PlayList) => {
  const loadedPlaylists = loadPlaylists()
  if (isArrayOf(isPlaylist)(loadedPlaylists)) {
    const result = loadedPlaylists.filter(playList => {
      return playList.id !== playlistToDelete.id
    })
    localStorage.setItem('Playlists', JSON.stringify(result))
  }
}

export const getPlaylistFromId = (id: string, playlists: PlayList[]) => {
  const result = playlists.filter(playlist => {
    return playlist.id === id
  })
  return result.at(0)
}
