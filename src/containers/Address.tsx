/* eslint-disable react/prop-types */
import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import _ from 'lodash';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';
import { hexToNumber } from '@etclabscore/eserialize';
import { History } from 'history';
import AddressView from '../components/AddressView';
import getBlocks, { useBlockNumber } from '../helpers';
import useMultiGethStore from '../stores/useMultiGethStore';
import AddressTransactions from '../components/AddressTransactions';

const unit = require('ethjs-unit'); // tslint:disable-line

interface IUrlParams {
  number: string | undefined;
}

interface IProps {
  match: {
    params: {
      address: string,
      block: string,
    };
  };
  history: History;
}

const Address: React.FC<IProps> = ({ match, history }) => {
  const { address, block } = match.params;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [blockNumber]: any = useBlockNumber(erpc);
  const [transactionCount, setTransactionCount]: [any, any] = React.useState();
  const [balance, setBalance]: [any, any] = React.useState();
  const [code, setCode]: [any, any] = React.useState();
  const blockNum = block !== undefined ? parseInt(block, 10) : blockNumber;
  const [transactions, setTransactions] = React.useState();

  const from = Math.max(blockNum - 99, 0);
  const to = blockNum;

  React.useEffect(() => {
    if (blockNum === undefined || blockNumber === undefined) {
      return;
    }
    if (blockNum > blockNumber) {
      history.push(`/address/${address}/${blockNumber}`);
    }
    if (blockNum < 0) {
      history.push(`/address/${address}/0`);
    }
  }, [blockNumber, blockNum, history, address]);

  React.useEffect(() => {
    if (blockNumber === undefined || !erpc) {
      return;
    }
    const hexBlockNumber = `0x${blockNumber.toString(16)}`;
    erpc.eth_getTransactionCount(address, hexBlockNumber).then(setTransactionCount);
    erpc.eth_getBalance(address, hexBlockNumber).then(setBalance);
    erpc.eth_getCode(address, hexBlockNumber).then(setCode);
  }, [blockNumber, address, erpc]);

  React.useEffect(() => {
    if (!erpc) { return; }
    getBlocks(from, to, erpc).then((blcks) => {
      const txes = _.flatMap(blcks, 'transactions');
      const filteredTxes = _.filter(txes, (tx: any) => {
        if (!tx) {
          return false;
        }
        return tx.to === address || tx.from === address;
      });
      const sortedTxes: any = _.sortBy(filteredTxes, (tx: any) => hexToNumber(tx.blockNumber)).reverse();
      setTransactions(sortedTxes);
    });
  }, [from, to]);

  // if (transactionCount === undefined || balance === undefined || code === undefined) {
  //   return <CircularProgress />;
  // }
  return (
    <>
      <AddressView
        address={address}
        txCount={transactionCount ? hexToNumber(transactionCount) : 0}
        balance={unit.fromWei(balance || 0, 'ether')}
        code={code}
      />
      <AddressTransactions
        from={from}
        to={to}
        transactions={transactions}
        disablePrev={blockNum >= blockNumber}
        disableNext={blockNum === 0}
        onPrev={() => {
          const newQuery = blockNum + 100;
          history.push(`/address/${address}/${newQuery}`);
        }}
        onNext={() => {
          const newQuery = Math.max(blockNum - 100, 0);
          history.push(`/address/${address}/${newQuery}`);
        }}
      />
    </>
  );
};

export default Address;
