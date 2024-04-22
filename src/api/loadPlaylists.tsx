import { is, isArrayOf } from 'ts-guardian'
import { PlayList } from '../App'

export const isNasaObject = is({
  copyright: is('string').or('undefined'),
  date: is('string'),
  explanation: is('string').or('undefined'),
  hdurl: is('string').or('undefined'),
  media_type: is('string').or('undefined'),
  service_version: is('string').or('undefined'),
  title: is('string'),
  url: is('string').or('undefined'),
})
export const isPlaylist = is({ name: is('string'), id: is('string'), list: isArrayOf(isNasaObject) })

export const loadPlaylists = () => {
  const retrievedPlaylists = localStorage.getItem('Playlists')
  if (retrievedPlaylists === null || isArrayOf(isPlaylist)(JSON.parse(retrievedPlaylists)) === false) {
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
    const oldPlaylist = loadedPlaylists.find(playlist => {
      return playlist.id === playlistToUpdate.id
    })
    const oldPlaylistIndex = loadedPlaylists.findIndex(playList => {
      if (oldPlaylist !== undefined) {
        return playList.id === oldPlaylist.id
      }
    })
    if (oldPlaylist === undefined && isPlaylist(playlistToUpdate)) {
      localStorage.setItem('Playlists', JSON.stringify([...loadedPlaylists, playlistToUpdate]))
    }
    const updatedPlaylist = { ...oldPlaylist, ...playlistToUpdate }
    const allButNewPlaylists = loadedPlaylists.filter(playlist => {
      return playlist.id !== updatedPlaylist.id
    })
    const result = [...allButNewPlaylists, updatedPlaylist]
    localStorage.setItem('Playlists', JSON.stringify(result))
  }
}
