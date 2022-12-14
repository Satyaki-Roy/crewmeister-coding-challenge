import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination
} from '@mui/material';
import {DataList} from "../../Pages/AbsencePage";
import './BasicTable.css';
import {useEffect, useState} from "react";
import ExportIcalFile from "../ExportIcalFile";

export interface Props {
  dataList: DataList[]
}

export const BasicTable = (props: React.PropsWithChildren<Props>): JSX.Element => {
  (BasicTable as React.FC).displayName = 'BasicTable';
  const {dataList} = props;

  const [paginatedDataList, setPaginatedDataList] = useState<DataList[]>();

  useEffect(() => {
    setPaginatedDataList(dataList.slice(0, 10));
  }, [dataList])

  function onChange(event: React.ChangeEvent<unknown>, page: number) {
    const end = page * 10;
    const start = end - 10
    setPaginatedDataList(dataList?.slice(start, end));
  }

  return (
    <>
      {(paginatedDataList?.length === 0) ? (
        <p className="no-data">No Data</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Member Name</b></TableCell>
                <TableCell align="center"><b>Type of absence</b></TableCell>
                <TableCell align="center"><b>Period</b></TableCell>
                <TableCell align="center"><b>Member note</b></TableCell>
                <TableCell align="center"><b>Status</b></TableCell>
                <TableCell align="center"><b>Admitter note</b></TableCell>
                <TableCell align="center"><b>Start Date</b></TableCell>
                <TableCell align="center"><b>End Date</b></TableCell>
                <TableCell align="center"><b>Export iCal File</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDataList?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.memberName}
                  </TableCell>
                  <TableCell align="center">{row.typeOfAbsence}</TableCell>
                  <TableCell align="center">{row.period}</TableCell>
                  <TableCell align="center">{row.memberNote}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.admitterNote}</TableCell>
                  <TableCell align="center">{new Date(row.startDate).toDateString()}</TableCell>
                  <TableCell align="center">{new Date(row.endDate).toDateString()}</TableCell>
                  <TableCell align="center"><ExportIcalFile icalFileDetails={row}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <br/>
      <div className="center">
        <Pagination
          count={dataList ? Math.ceil(dataList.length / 10) : 0}
          onChange={onChange}
        />
      </div>
      <div className="center">
        <p className="total-count"><i>Total number of absences</i> <b>{dataList.length}</b></p>
      </div>
    </>
  );
}