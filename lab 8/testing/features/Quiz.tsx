import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from "../quizData";
import Matching from './Matching';
import Results from './Result';
import { useState } from 'react';

function Quiz() {

  const [showAnswers, setShowAnswers] = useState(false);
  const [needReset, setNeedReset] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswers(true);
  }

  const handleRestart = () => {
    setShowAnswers(false);
    setNeedReset(value => !value);
  }
   
  return (
    <Container maxWidth="md">
      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p:2 }}>
          <Typography variant="h5" gutterBottom>
                {index + 1}. { item.title }
          </Typography>
          <Matching index={index} tasks={item.tasks} needReset={needReset} isDisabled={showAnswers} taskType={item.type}/>
        </Box>
        ))}
      <Box sx={{ display: 'flex', justifyContent:'space-around' }}>
        <Button variant="contained" onClick={handleShowAnswer}>Проверить</Button>
        <Button variant="contained" onClick={handleRestart}>Начать снова</Button>
      </Box>
      <Box sx={{display: showAnswers ? "block" : "none", textAlign: "center", mt: "20px"}}>
        <Typography variant="h5">Результаты теста</Typography>
        {
          quiz.map((item, index) => (
          <Results index={index} correctAnswers={item.tasks} taskType={item.type}/>
          ))
        }
      </Box>
    </Container>
  );
}

export default Quiz