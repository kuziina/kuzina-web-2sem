import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';

import { tTasks } from '../quizData';

interface ChoiceTaskProps {
    task: tTasks[0];
    type: string;
    value: string[];
    onChange: (val: string ) => void;
    isDisabled?: boolean;
}

function ChoiceTask({ task, type, value, onChange, isDisabled }: ChoiceTaskProps) {

    const handleChange = () => {
        if (!isDisabled) {
            onChange(task.question);
        }
    };
    
    return (
        <Box sx={{ mb: 1 }}>
            {type === "CO" ? (
                <FormControl component="fieldset">
                    <RadioGroup
                        value={value[0] || ''}
                        onChange={() => onChange(task.question)}
                        
                    >
                        <FormControlLabel 
                            value={task.question}
                            control={<Radio color="info" size="small" />} 
                            label={task.question} 
                            onClick={(e) => {
                                if (isDisabled) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </RadioGroup>
                </FormControl>
            ) : (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={value.includes(task.question)}
                            onChange={() => {
                                if (value.includes(task.question)) {
                                    onChange(task.question);
                                } else {
                                    onChange(task.question);
                                }
                            }}
                            color="info"
                            size="small"
                        />
                    }
                    label={task.question}
                    onClick={(e) => {
                        if (isDisabled) {
                            e.preventDefault(); 
                        }
                    }}
                />
            )}
        </Box>
    );
}

export default ChoiceTask;