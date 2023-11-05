import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({Heading, Content}) {
  return (
    <TableContainer component={Paper} sx={ {margin: '25px 25px 25px 25px'}}>
      <Table sx={{ minWidth: 600, padding: '8px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Heading.map((name)=>(<TableCell >{name}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Content.map((row) => (
            <TableRow
              key={row.Step}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {Heading.map((name)=>(<TableCell >{row[name]}</TableCell>))}
            </TableRow>
          ))}          
        </TableBody>
      </Table>
    </TableContainer>
  );
}