import * as React from 'react';
import {Button} from "@mui/material";
import {DataList} from "../../Pages/AbsencePage";
import {ICalendar} from 'datebook';
import {download} from "../../utils/clientSideDownload";
import dayjs from "dayjs";

export interface Props {
  icalFileDetails: DataList;
}

interface CalendarOptions {
  title: string;
  description: string;
  start: Date;
  end: Date;
}

export default function ExportIcalFile(props: React.PropsWithChildren<Props>): JSX.Element {
  (ExportIcalFile as React.FC).displayName = 'ExportIcalFile';
  const {icalFileDetails} = props;

  const start: Date = dayjs(icalFileDetails.startDate).startOf('day').toDate();
  const end: Date = dayjs(icalFileDetails.endDate).endOf('day').toDate();

  const exportIcalFile = (event: React.MouseEvent<HTMLElement>): void => {
    const config: CalendarOptions = {
      title: `${icalFileDetails.memberName} is on ${icalFileDetails.typeOfAbsence} leave`,
      description: icalFileDetails.memberNote,
      start,
      end
    }

    const icalendar: ICalendar = new ICalendar(config)

    download(`${icalFileDetails.id}.ics`, icalendar.render());
  }

  return (
    <Button onClick={exportIcalFile}>Export iCal File</Button>
  );
}