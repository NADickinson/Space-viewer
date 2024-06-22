import React from 'react'
import { CustomButton } from '../tool_bar/CustomButton'
import { deletePlaylist, getPlaylistFromId, loadPlaylists } from '../../api/playlistFunctions'
import { PlayList } from '../../App'

export const DeletePlaylistOption = ({
  selectedId,
  playLists,
  setPlayLists,
  setSelectedId,
  setDeleteOption,
}: {
  selectedId: string | undefined
  playLists: PlayList[] | undefined
  setPlayLists: (playlist: PlayList[]) => void
  setSelectedId: (id: string | undefined) => void
  setDeleteOption: (deleteOption: boolean) => void
}) => {
  const selectedPlaylist = selectedId && playLists ? getPlaylistFromId(selectedId, playLists) : undefined
  return (
    <div>
      {'Are you sure you want to delete this playlist?'}
      <div>
        {selectedPlaylist ? (
          <CustomButton
            text={'Yes'}
            onClick={() => {
              deletePlaylist(selectedPlaylist)
              setPlayLists(loadPlaylists())
              if (!playLists?.includes(selectedPlaylist)) {
                setSelectedId(undefined)
              }
            }}
          />
        ) : undefined}
        <CustomButton
          text={'No'}
          onClick={() => {
            setDeleteOption(false)
          }}
        />
      </div>
    </div>
  )
}
