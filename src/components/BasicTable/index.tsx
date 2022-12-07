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
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Member Name</TableCell>
              <TableCell align="center">Type of absence</TableCell>
              <TableCell align="center">Period</TableCell>
              <TableCell align="center">Member note</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Admitter note</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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