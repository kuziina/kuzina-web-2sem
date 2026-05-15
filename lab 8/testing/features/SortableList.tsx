import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import List from '@mui/material/List';
import {SortableItem} from '../components/SortableItem';
import { useDispatch, useSelector } from 'react-redux';
import { setDraggedItems } from './quizSlice';
import { RootState } from '../../store';
import { tTasks } from "../quizData";

interface ComponentProps {
    index: number;
    answers: tTasks;
    isDisabled?: boolean; 
    taskType: string;
  }

function SortableList({ answers, index, isDisabled = false, taskType }: ComponentProps ) {
  const dispatch = useDispatch();
  const arr = useSelector((state: RootState) => state.lists.lists[index])
  const draggedItems = arr || []; 

  const handleDragEnd = (event: any) => {

    if (isDisabled) return;
    
    const { active, over } = event;
    if (active.id !== over.id) {
       const oldIndex = draggedItems.indexOf(active.id);
       const newIndex = draggedItems.indexOf(over.id);
       const newList = arrayMove(draggedItems, oldIndex, newIndex);
       dispatch(setDraggedItems({ index, items: newList }));
    } 
  };
 
    return (
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ draggedItems } 
                         strategy={verticalListSortingStrategy}>
          <List>
            {draggedItems.map((item) => {
              const text = answers.find(i => i.answer === item);
              const displayText = taskType === "S" ? text?.question : text?.answer;
              return ( <SortableItem  key={item}  item={displayText || "Нет ответа"} id={item} isDisabled={isDisabled} /> );
          })}
          </List>
        </SortableContext>
      </DndContext>
    );
}

export default SortableList;