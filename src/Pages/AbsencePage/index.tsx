import React, {useEffect, useState} from "react";
import {BasicTable} from "../../components/BasicTable";
import absences from "../../api/json_files/absences.json";
import members from "../../api/json_files/members.json";
import {calculateDays} from "../../utils/calculateDays";
import Filter from "../../components/Filter";
import "./AbsencePage.css"

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
}

export const AbsencePage = (props: React.PropsWithChildren<Props>): JSX.Element => {
  (AbsencePage as React.FC).displayName = 'AbsencePage';
  const {} = props;

  const [absencesList, setAbsencesList] = useState<Array<any>>([]);
  const [membersList, setMembersList] = useState<Array<any>>([]);
  const [dataList, setDataList] = useState<DataList[]>([]);
  const [absenceType, setAbsenceType] = useState<string>('');

  useEffect(() => {
    setAbsencesList(absences.payload);
    setMembersList(members.payload);
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
    }
  }

  useEffect(() => {
    const data: DataList[] = absencesList.map(prepareData)
    setDataList(data)
  }, [absencesList, membersList])

  useEffect(() => {
    const data: DataList[] = absencesList.map(prepareData)
    if (absenceType === "") {
      setDataList(data);
    } else {
      setDataList(data.filter(e => e.typeOfAbsence === absenceType));
    }
  }, [absenceType])

  return (
    <>
      <h1 className="heading">Absence Page</h1>
      <div className="filters">
        <div className="absence-type">
          <Filter label="Absence Type" menuItems={['sickness', 'vacation']}
                  value={absenceType} setValue={setAbsenceType}/>
        </div>
        {/*<div className="absence-date"><Filter /></div>*/}
      </div>
      <BasicTable dataList={dataList}/>
    </>
  );
};
