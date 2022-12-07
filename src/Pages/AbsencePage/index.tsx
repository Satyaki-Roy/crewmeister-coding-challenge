import React, {useEffect, useState} from "react";
import {BasicTable} from "../../components/BasicTable";
import absences from "../../api/json_files/absences.json";
import members from "../../api/json_files/members.json";
import {calculateDays} from "../../utils/calculateDays";
import Filter from "../../components/Filter";
import "./AbsencePage.css"
import BasicDateRangePicker from "../../components/BasicDateRangePicker";
import {DateRange} from "@mui/x-date-pickers-pro/DateRangePicker";
import {Dayjs} from "dayjs";
import {checkIfTheDateIsBetween} from "../../utils/checkIfTheDateIsBetween";
import {Button, CircularProgress} from '@mui/material';

export interface Props {
}

export interface DataList {
  id: number
  memberName: string;
  typeOfAbsence: 'sickness' | 'vacation';
  period: number;
  memberNote: string;
  status: 'Requested' | 'Confirmed' | 'Rejected';
  admitterNote: string;
  startDate: string;
  endDate: string;
}

export const AbsencePage = (props: React.PropsWithChildren<Props>): JSX.Element => {
  (AbsencePage as React.FC).displayName = 'AbsencePage';
  const {} = props;

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isErrorState, setIsErrorState] = useState<boolean>(false)
  const [absencesList, setAbsencesList] = useState<Array<any>>([]);
  const [membersList, setMembersList] = useState<Array<any>>([]);
  const [dataList, setDataList] = useState<DataList[]>([]);
  const [absenceType, setAbsenceType] = useState<string>('');
  const [isAbsenceFilterApplied, setIsAbsenceFilterApplied] = useState<boolean>(false);
  const [dateRangeValue, setDateRangeValue] = React.useState<DateRange<Dayjs>>([null, null]);
  const [isDateFilterApplied, setIsDateFilterApplied] = useState<boolean>(false);
  const [isFilterValueChanged, setIsFilterValueChanged] = useState<boolean>(false);

  useEffect(() => {
    if (absences.message !== "Success" || members.message !== "Success") {
      setIsErrorState(true);
    } else {
      setIsErrorState(false);
      setAbsencesList(absences.payload);
      setMembersList(members.payload);
    }
  }, [])

  const prepareData = (e: any): DataList => {
    return {
      id: e.id,
      memberName: membersList.find((m) => m.userId === e.userId).name,
      typeOfAbsence: e.type,
      period: calculateDays(e.startDate, e.endDate),
      memberNote: e.memberNote || "No Member Note",
      // TODO: not sure how to handle rejected as of now.
      status: e.confirmedAt ? "Confirmed" : "Requested",
      admitterNote: e.admitterNote || "No Admitter Note",
      startDate: e.startDate,
      endDate: e.endDate
    }
  }

  useEffect(() => {
    // just to demo the loading state
    setTimeout(() => {
      const data: DataList[] = absencesList.map(prepareData);
      setDataList(data);
      setIsLoading(false);
    }, 1000)
  }, [absencesList, membersList])

  useEffect(() => {
    if (absenceType === "") {
      setIsAbsenceFilterApplied(false);
    } else {
      setIsAbsenceFilterApplied(true);
    }
    setIsFilterValueChanged((prevState) => !prevState);
  }, [absenceType])

  useEffect(() => {
    if (dateRangeValue[0] && dateRangeValue[1]) {
      setIsDateFilterApplied(true)
    }
    setIsFilterValueChanged((prevState) => !prevState);
  }, [dateRangeValue])

  useEffect(() => {
    if (isAbsenceFilterApplied && isDateFilterApplied) {
      const data: DataList[] = absencesList
        .filter(e => checkIfTheDateIsBetween(e.startDate, e.endDate, dateRangeValue[0], dateRangeValue[1]))
        .map(prepareData)
        .filter(e => e.typeOfAbsence === absenceType);
      setDataList(data);
    } else if (isAbsenceFilterApplied && !isDateFilterApplied) {
      const data: DataList[] = absencesList
        .map(prepareData)
        .filter(e => e.typeOfAbsence === absenceType);
      setDataList(data);
    } else if (!isAbsenceFilterApplied && isDateFilterApplied) {
      const data: DataList[] = absencesList
        .filter(e => checkIfTheDateIsBetween(e.startDate, e.endDate, dateRangeValue[0], dateRangeValue[1]))
        .map(prepareData);
      setDataList(data);
    } else if (!(isAbsenceFilterApplied && isDateFilterApplied)) {
      const data: DataList[] = absencesList.map(prepareData)
      setDataList(data)
    }
  }, [isAbsenceFilterApplied, isDateFilterApplied, isFilterValueChanged])

  const removeAllFilters = (event: React.MouseEvent<HTMLElement>) => {
    setAbsenceType('');
    setIsAbsenceFilterApplied(false);
    setDateRangeValue([null, null]);
    setIsDateFilterApplied(false);
  }

  return isErrorState ? (
    <>
      <div className="error-state">
        <p>Error occurred, please refresh the browser and try to load again.</p>
      </div>
    </>
  ) : (
    <>
      <h1 className="heading">Absence Page</h1>
      <div className="filters">
        <div className="absence-type">
          <Filter label="Absence Type" menuItems={['sickness', 'vacation']}
                  value={absenceType} setValue={setAbsenceType}/>
        </div>
        <div className="button"><Button onClick={removeAllFilters} variant="outlined">Remove All Filters</Button></div>
        <div className="absence-date">
          <BasicDateRangePicker dateRangeValue={dateRangeValue} setDateRangeValue={setDateRangeValue}/>
        </div>
      </div>
      {isLoading ? <div className="loading"><CircularProgress /></div> : <BasicTable dataList={dataList}/>}
    </>
  );
};
