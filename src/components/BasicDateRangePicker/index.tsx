import * as React from 'react';
import {Dayjs} from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {LocalizationProvider} from '@mui/x-date-pickers-pro';
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs';
import {DateRangePicker, DateRange} from '@mui/x-date-pickers-pro/DateRangePicker';

export interface Props {
  dateRangeValue: DateRange<Dayjs>;
  setDateRangeValue: (newValue: DateRange<Dayjs>) => void
}

export default function BasicDateRangePicker(props: React.PropsWithChildren<Props>): JSX.Element {
  (BasicDateRangePicker as React.FC).displayName = 'BasicDateRangePicker';
  const {dateRangeValue, setDateRangeValue} = props;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{start: 'Start-date', end: 'End-date'}}
    >
      <DateRangePicker
        value={dateRangeValue}
        onChange={(newValue) => {
          setDateRangeValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{mx: 2}}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}