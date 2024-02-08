import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { selectUser } from '../store/userSlice';


const TableComponent = () => {

  const [tableData, setTableData] = useState([]);

  const userSelector = useSelector(selectUser);
  let year = 2000;

  useEffect(() => {
    setTableData(userSelector.data);
  }, [userSelector.data])


  return (
    <div>
      <h1>Finances</h1>
      <TableContainer component={Paper} sx={{scrollbarWidth:"thin"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              {
                tableData && tableData[0]?.values?.map((value, index) => <TableCell key={index}>{year + index}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData && tableData.map((row, key) => (
              <TableRow key={key}>
                <TableCell>{row.category}</TableCell>
                {row?.values?.map((value, index) => <TableCell key={index}>{value}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;