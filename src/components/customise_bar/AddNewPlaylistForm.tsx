import React, { useRef } from 'react'
import { CustomButton } from '../tool_bar/CustomButton'
import { PlayList } from '../../App'
import { loadPlaylists, updateOrAddPlaylist } from '../../api/playlistFunctions'

export const AddNewPlaylistForm = ({ setPlaylists }: { setPlaylists: (playlistsArr: PlayList[]) => void }) => {
  const inputVal = useRef<HTMLInputElement>(null)

  return (
    <div style={{ padding: '5px', display: 'flex' }}>
      <div style={{ padding: '5px' }}>
        <input type={'text'} ref={inputVal} style={{ fontSize: '1.2rem' }}></input>
      </div>
      <CustomButton
        onClick={() => {
          if (inputVal.current?.value && inputVal.current.value.trim() !== '') {
            const newPlaylist = { name: inputVal.current.value, id: crypto.randomUUID(), list: [] }
            updateOrAddPlaylist(newPlaylist)
            const refreshedPlaylists = loadPlaylists()
            setPlaylists(refreshedPlaylists)
            inputVal.current.value = ''
          }
        }}
        text={'Add New Playlist'}
      />
    </div>
  )
}
