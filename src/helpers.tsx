import ERPC from '@etclabscore/ethereum-json-rpc';
import * as React from 'react';
import useInterval from 'use-interval';
import Web3 from 'web3';
import { hexToNumber } from '@etclabscore/eserialize';

const web3 = new Web3('http://localhost:5005/api/eth/request');

export const getBlocks = (from: number, to: number, erpc: ERPC): Promise<any> => {
  console.log(from, to);
  const promises: any[] = [];

  for (let i = from; i <= to; i += 1) {
    promises.push(web3.eth.getBlock(i, true));
    // promises.push(erpc.eth_getBlockByNumber(`0x${i.toString(16)}`, true));
  }
  return Promise.all(promises);
};

export const useBlockNumber = (erpc: ERPC | undefined) => {
  const [blockNumber, setBlockNumber]: [any, any] = React.useState();
  useInterval(() => {
    if (!erpc) {
      return;
    }
    web3.eth.getBlockNumber().then((bn) => {
      setBlockNumber(hexToNumber(bn.toString()));
    });
    // erpc.eth_blockNumber().then((bn: string) => {
    //   setBlockNumber(hexToNumber(bn));
    // });
  }, 7000, true);
  React.useEffect(() => {
    if (erpc) {
      web3.eth.getBlockNumber().then((bn) => {
        setBlockNumber(hexToNumber(bn.toString()));
      });
      // erpc.eth_blockNumber().then((bn: string) => {
      //   setBlockNumber(hexToNumber(bn));
      // });
    }
  }, [erpc]);
  return [blockNumber];
};

export default getBlocks;
