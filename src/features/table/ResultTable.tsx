import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { ContestResult } from '../../api';
import { getColor } from '../../utils';

type Props = {
  results: ContestResult[];
};

function ResultTable({ results }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='center'> Name</TableCell>
          <TableCell align='center'>Rank</TableCell>
          <TableCell align='center'>Performance</TableCell>
          <TableCell align='center'>Old Rating</TableCell>
          <TableCell align='center'>New Rating</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map((row) => (
          <TableRow key={row.ContestName}>
            <TableCell component='th' scope='row'>
              {row.ContestName}
            </TableCell>
            <TableCell align='right'>{row.Place}</TableCell>
            <TableCell
              align='right'
              style={{ backgroundColor: getColor(row.Performance) }}
            >
              {/* <span style={{ color: getColor(row.Performance) }}> */}
              {row.Performance}
              {/* </span> */}
            </TableCell>
            <TableCell align='right'>{row.OldRating}</TableCell>
            <TableCell align='right'>{row.NewRating}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ResultTable;
