import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { tTasks } from '../quizData';
import { Typography } from '@mui/material';

interface ResultsProps {
  index: number;
  correctAnswers: tTasks;
  taskType: string;
}

function Results({ index, correctAnswers, taskType }: ResultsProps) {
  const answers = useSelector((state: RootState) => 
    state.lists.lists[index]
  );

  if (!answers) {
    return (
        <></>
    );
  }

  if (taskType === "M" || taskType === "S") { 
      const countRight = correctAnswers.filter((value, idx) => value.answer === answers[idx]).length;

      const taskString = `Задание ${ index + 1 } : `
      const resultString = countRight === answers.length ? "Все ответы верные!" : `Верных ответов - ${ countRight }`;
      return (
        <Typography>{ taskString + resultString }</Typography>
      );
  }

  if (taskType === "CO") {
        const correct = correctAnswers.find(t => t.answer === "1")?.question;
        const isRight = answers[0] === correct;
        console.log(answers);
        return <Typography>Задание {index + 1} : {isRight ? "Верный ответ!" : "Неверный ответ!"}</Typography>;
    }

    if (taskType === "CS") {
        const correctQuestions = correctAnswers.filter(t => t.answer === "1").map(t => t.question);
        console.log(answers);
        if (answers.length > correctQuestions.length) {
          return <Typography>Задание {index + 1} : Неверное решение</Typography>;
        }
    

        const isRight = answers.length === correctQuestions.length && correctQuestions.every((q: string) => answers.includes(q));
        
        const correctCount = answers.filter((q: string) => 
            correctQuestions.includes(q)
        ).length;
        
        const result = isRight 
            ? "Все ответы верные!" 
            : `Верных ответов - ${correctCount} из ${correctQuestions.length}`;
        
        return <Typography>Задание {index + 1} : {result}</Typography>;
    }

    return (<></>);
}

export default Results;