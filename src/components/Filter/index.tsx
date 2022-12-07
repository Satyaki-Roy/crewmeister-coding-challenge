import * as React from 'react';
import {Box, InputLabel, MenuItem, FormControl} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export interface Props {
  label: string;
  menuItems: string[];
  value: string;
  setValue: (value: string) => void
}

export default function Filter(props: React.PropsWithChildren<Props>): JSX.Element {
  (Filter as React.FC).displayName = 'Filter';
  const {label, menuItems, value, setValue} = props;

  // const [value, setValue] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{width: 150, paddingTop: 1}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItems.map((e, index) => {
            return (
              <MenuItem key={index} value={e}>{e}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
