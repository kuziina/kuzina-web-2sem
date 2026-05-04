import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

type tSeries= {
  'Максимальный рейтинг': boolean,
  'Средний рейтинг': boolean,
  'Минимальный рейтинг': boolean,
 }

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<
    React.SetStateAction<tSeries>
  >;
  isBar: boolean;
 setIsBar: React.Dispatch<
 React.SetStateAction<boolean>
 >;
};

function SettingChart({series, setSeries, isBar, setIsBar}: CheckboxProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeries({
        ...series,
        [event.target.name]: event.target.checked,
        });
    };

    const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsBar(event.target.value === "bar" ? true : false);
    }
    
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ m: "20px 0", justifyContent: "center"}}
    >
      <FormControl>
        <FormLabel id="label-radio-group">
          Тип диаграммы:
        </FormLabel>
        <RadioGroup
          name="group-radio"
          value={(isBar) ? "bar": "dot"}
          onChange={handleRadio}
        >
          <FormControlLabel value="bar"
            control={
              <Radio checked={isBar} />
            }
            label="Гистограмма"
          />
          <FormControlLabel value="dot"
            control={
              <Radio checked={!isBar}/>
            }
            label="Линейная"
          />
        </RadioGroup>
      </FormControl>
    <FormControl>
      <FormLabel id="label-checkbox-group">
        На диаграмме показать:
      </FormLabel>
      <FormControlLabel
        control={
          <Checkbox checked={series["Максимальный рейтинг"]}
            name="Максимальный рейтинг" 
            onChange={handleChange}/>
        }
        label="максимальный рейтинг" 
      />
      <FormControlLabel
        control={
          <Checkbox checked={series["Средний рейтинг"]}
            name="Средний рейтинг" 
            onChange={handleChange}/>
        }
        label="средний рейтинг" 
      />
      <FormControlLabel
        control={
          <Checkbox checked={series["Минимальный рейтинг"]}
            name="Минимальный рейтинг" 
            onChange={handleChange}/>
        }
        label="минимальный рейтинг" 
      />
    </FormControl>
    </Stack>
  )
}
export default SettingChart;