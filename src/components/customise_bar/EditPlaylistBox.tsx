import React, { useEffect, useState } from 'react'
import { NasaObject, PlayList } from '../../App'
import { CustomButton } from '../tool_bar/CustomButton'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateOrAddPlaylist } from '../../api/playlistFunctions'

export const EditPlaylistBox = ({
  playListToEdit,
  playLists,
  setPlayLists,
  setCurrentDisplayed,
}: {
  playListToEdit: PlayList
  playLists: PlayList[]
  setPlayLists: (playLists: PlayList[]) => void
  setCurrentDisplayed: (obj: NasaObject) => void
}) => {
  useEffect(() => {
    setNewOrderOfPlaylist(playListToEdit)
  }, [playListToEdit])
  const [newOrderOfPlaylist, setNewOrderOfPlaylist] = useState<PlayList>(playListToEdit)
  return (
    <DragDropContext
      onDragEnd={result => {
        if (!result.destination) return
        const newOrderedPlaylist = Array.from(newOrderOfPlaylist.list)
        const [reorderedItem] = newOrderedPlaylist.splice(result.source.index, 1)
        if (result.destination) newOrderedPlaylist.splice(result.destination.index, 0, reorderedItem)
        const currentNewOrder = { ...newOrderOfPlaylist, list: newOrderedPlaylist }
        setNewOrderOfPlaylist(currentNewOrder)
        const oldPlayListIndex = playLists.findIndex(playList => {
          return playList.id === currentNewOrder.id
        })
        const newArr = [...playLists]
        newArr.splice(oldPlayListIndex, 1, currentNewOrder)
        setPlayLists(newArr)
        updateOrAddPlaylist(currentNewOrder)
      }}
    >
      <div style={{ padding: '10px' }}>
        <Droppable droppableId={'playlist_items'}>
          {provided => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {newOrderOfPlaylist.list.map((nasaObject: NasaObject, index) => {
                  return (
                    <Draggable
                      key={`${nasaObject.date}-${index}`}
                      index={index}
                      draggableId={`${nasaObject.date}-${index}`}
                    >
                      {provided => {
                        return (
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <CustomIndividualItems
                              setCurrentDisplayed={setCurrentDisplayed}
                              item={nasaObject}
                              removeFromPlaylist={() => {
                                const result = {
                                  ...newOrderOfPlaylist,
                                  list: newOrderOfPlaylist.list.filter((_, i) => {
                                    return i !== index
                                  }),
                                }
                                setNewOrderOfPlaylist(result)
                                const editedPlaylistIndex = playLists.findIndex(playList => {
                                  return playList.id === result.id
                                })
                                const newPlaylists = [...playLists]
                                newPlaylists[editedPlaylistIndex] = result
                                setPlayLists(newPlaylists)
                                updateOrAddPlaylist(result)
                              }}
                            />
                          </div>
                        )
                      }}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

const CustomIndividualItems = ({
  item,
  removeFromPlaylist,
  setCurrentDisplayed,
}: {
  item: NasaObject
  removeFromPlaylist: () => void
  setCurrentDisplayed: (obj: NasaObject) => void
}) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {item.title} <CustomButton text={'View'} onClick={() => setCurrentDisplayed(item)} />
      <CustomButton deleteButton={true} onClick={removeFromPlaylist} />
    </div>
  )
}
