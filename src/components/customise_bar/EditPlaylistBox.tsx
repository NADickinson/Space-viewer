import React, { Children, ReactNode, useEffect, useState } from 'react'
import { NasaObject, PlayList } from '../../App'
import { CustomButton } from '../tool_bar/CustomButton'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateOrAddPlaylist } from '../../api/loadPlaylists'

export const EditPlaylistBox = ({
  playListToEdit,
  playLists,
  setPlayLists,
}: {
  playListToEdit: PlayList
  playLists: PlayList[]
  setPlayLists: (playLists: PlayList[]) => void
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
        console.log(oldPlayListIndex, currentNewOrder)
        setPlayLists(newArr)
        updateOrAddPlaylist(currentNewOrder)
      }}
    >
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
                            item={nasaObject}
                            removeFromPlaylist={() => {
                              const result = {
                                ...newOrderOfPlaylist,
                                list: newOrderOfPlaylist.list.filter(obj => {
                                  return obj !== nasaObject
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
    </DragDropContext>
  )
}

const CustomIndividualItems = ({ item, removeFromPlaylist }: { item: NasaObject; removeFromPlaylist: () => void }) => {
  return (
    <div>
      {item.title} <CustomButton onClick={removeFromPlaylist} />
    </div>
  )
}
