import React, { useRef } from 'react'
import { CustomButton } from '../tool_bar/CustomButton'
import { PlayList } from '../../App'
import { loadPlaylists, updateOrAddPlaylist } from '../../api/loadPlaylists'

export const AddNewPlaylistForm = ({ setPlaylists }: { setPlaylists: (playlistsArr: PlayList[]) => void }) => {
  const inputVal = useRef<string>()

  return (
    <div>
      <input
        type={'text'}
        onChange={e => {
          inputVal.current = e.target.value
        }}
      ></input>
      <CustomButton
        onClick={() => {
          if (inputVal.current === undefined) {
            return
          }
          const newPlaylist = { name: inputVal.current, id: crypto.randomUUID(), list: [] }
          updateOrAddPlaylist(newPlaylist)
          const refreshedPlaylists = loadPlaylists()
          setPlaylists(refreshedPlaylists)
          console.log(refreshedPlaylists)
        }}
        text={'Add New Playlist'}
      />
    </div>
  )
}
