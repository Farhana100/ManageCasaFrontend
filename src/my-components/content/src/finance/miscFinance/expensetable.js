import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



export default function StickyHeadTable(props) {
  const columns = [
    { id: 'date', label: 'DATE', minWidth: 100 },
    { id: 'purpose', label: 'PURPOSE', minWidth: 170, align: 'right' },
    { id: 'amount', label: 'AMOUNT', minWidth: 170, align: 'right'},
    { id: 'comment', label: 'COMMENT', minWidth: 170, align: 'right'},
  ];
  
  function createData(date, purpose, amount, comment) {
    let date_ = "";
    date_ = (date_ + date).substring(0, 10) + " " + (date_ + date).substring(11, 19);
    date = date_;
    return { date, purpose, amount, comment};
  }
  
  const rows = [];
  
  for(let i = 0; i < props.expenseInfo.length; i++){
    rows.push(createData(props.expenseInfo[i].date, props.expenseInfo[i].category, props.expenseInfo[i].paid_amount, props.expenseInfo[i].comment));
  }
  

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
