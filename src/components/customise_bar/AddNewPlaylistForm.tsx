import React, { useRef } from 'react'
import { CustomButton } from '../tool_bar/CustomButton'
import { PlayList } from '../../App'
import { loadPlaylists, updateOrAddPlaylist } from '../../api/playlistFunctions'

export const AddNewPlaylistForm = ({ setPlaylists }: { setPlaylists: (playlistsArr: PlayList[]) => void }) => {
  const inputVal = useRef<string>()

  return (
    <div style={{ padding: '10px' }}>
      <input
        type={'text'}
        onChange={e => {
          inputVal.current = e.target.value
        }}
        style={{ margin: '10px', backgroundColor: '#b1b3b3', fontSize: '1.2rem' }}
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
        }}
        text={'Add New Playlist'}
      />
    </div>
  )
}
