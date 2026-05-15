import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {tTasks} from "../quizData"
import SortableList from './SortableList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addList, setDraggedItems } from './quizSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ChoiceTask from './ChoiceTask';

interface ComponentProps {
    tasks: tTasks;
    index: number;
    needReset: boolean;
    isDisabled: boolean;
    taskType: string;
  }

function Matching({tasks, index, needReset, isDisabled, taskType}: ComponentProps) {

    const answers = useMemo(() =>{
      return [...tasks].sort(() => Math.random() - 0.5);
    },[needReset])

    const dispatch = useDispatch();
    const userAnswers = useSelector((state: RootState) => state.lists.lists[index]) || [];

    useEffect(() => {
      if (taskType === "M" || taskType === "S") {
          dispatch(addList({ index, items: answers.map(item => item.answer) }));
      }
    }, [dispatch, index, answers]);

    useEffect(() => {
        if (taskType === "CO" || taskType === "CS") {
            if (needReset) {
                dispatch(setDraggedItems({ index, items: [] }));
            } else if (!userAnswers.length) {
                dispatch(addList({ index, items: [] }));
            }
        } else {
            dispatch(addList({ index, items: answers.map(item => item.answer) }));
        }
    }, [dispatch, index, answers, taskType, needReset]);

    const handleSelect = (question: string) => {
        if (taskType === "CO") {
            dispatch(setDraggedItems({ index, items: [question] }));
        } else {
            const newSelection = userAnswers.includes(question)
                ? userAnswers.filter((q: string) => q !== question)
                : [...userAnswers, question];
            dispatch(setDraggedItems({ index, items: newSelection }));
        }
    };

  return (
    taskType === "M" ?
      (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton 
              sx={{
                border: '1px solid gray',
                borderRadius: '5px',
                textAlign: 'right',
            }}>
              <ListItemText primary={item.question} />
           </ListItemButton>
          </ListItem> 
          ))}
        </List>
      </Grid>

      <Grid size={6}>
          <SortableList index={index} answers={answers} isDisabled={isDisabled} taskType={taskType}/>
      </Grid>
    </Grid> 
  ) : taskType === "S" ?
      (<Grid container spacing={2} sx={{justifyContent:"center"}}>
        <Grid size={6}>
          <List>
              <SortableList index={index} answers={answers} isDisabled={isDisabled} taskType={taskType}/>
          </List>
        </Grid>
      </Grid>)
       : (
        <Grid container spacing={2} sx={{ justifyContent: "center", px: 2 }}>
          <Grid size={12}>
              <List>
                  {answers.map((task, taskIdx) => (
                      <ListItem key={taskIdx} sx={{ display: "block" }}>
                          <ChoiceTask
                              task={task}
                              type={taskType}
                              value={userAnswers}
                              onChange={handleSelect}
                              isDisabled={isDisabled}
                          />
                      </ListItem>
                  ))}
              </List>
          </Grid>
      </Grid>
      )
    );
}

export default Matching;