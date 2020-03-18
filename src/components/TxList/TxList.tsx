import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';

import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { hexToNumber } from '@etclabscore/eserialize';
import useMultiGethStore from '../../stores/useMultiGethStore';
import { getTxs } from '../../helpers';

function TxListItem({ tx, showblockNumber }: { tx: any, showblockNumber?: boolean }) {
  return (
    <TableRow>
      {showblockNumber && <TableCell>{hexToNumber(tx.blockNumber)}</TableCell>}

      <TableCell>
        <Link
          component={({ className, children }: { children: any, className: string }) => (
            <RouterLink className={className} to={`/tx/${tx.hash}`}>
              {children}
            </RouterLink>
          )}
        >
          {tx.hash}
        </Link>
      </TableCell>

      <TableCell>
        <Link
          component={({ className, children }: { children: any, className: string }) => (
            <RouterLink className={className} to={`/address/${tx.from}`}>
              {children}
            </RouterLink>
          )}
        >
          {tx.from}
        </Link>
      </TableCell>

      <TableCell>
        {tx.to !== null
          ? (
            <Link
              component={({ className, children }: { children: any, className: string }) => (
                <RouterLink className={className} to={`/address/${tx.to}`}>
                  {children}
                </RouterLink>
              )}
            >
              {tx.to}
            </Link>
          )
          : null}
      </TableCell>

      <TableCell>{hexToNumber(tx.transactionIndex)}</TableCell>
    </TableRow>
  );
}

export interface ITxListProps {
  transactions: any[];
  showBlockNumber?: boolean;
}

function TxList(props: ITxListProps) {
  const { showBlockNumber, transactions } = props;
  // const [erpc]: [EthereumJSONRPC] = useMultiGethStore();

  // const txs = (transactions.length > 0 && transactions[0].hash)
  //   ? transactions
  //   : await getTxs(transactions, erpc);
  return (
    <Table>
      <TableHead>
        <TableRow>
          {showBlockNumber && <TableCell>Delta Number</TableCell>}
          <TableCell>Hash</TableCell>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell>Index</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {transactions.map(
          (tx: any) => <TxListItem key={tx.hash} tx={tx} showblockNumber={props.showBlockNumber} />,
        )}
      </TableBody>
    </Table>
  );
}

export default TxList;
