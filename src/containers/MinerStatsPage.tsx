
import { CircularProgress, useTheme, Theme } from '@material-ui/core';
import * as React from 'react';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';
import { History } from 'history';
import _ from 'lodash';
import useMultiGethStore from '../stores/useMultiGethStore';
import getBlocks, { useBlockNumber } from '../helpers';
import MinerStats from '../components/MinerStats';
import MinerStatsTable from '../components/MinerStatsTable';
import StatCharts from '../components/StatCharts';
import getTheme from '../themes/victoryTheme';
import BlockPagination from '../components/BlockPagination';

const { useState } = React;

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};
interface IProps {
  match: {
    params: {
      address: string,
      block: string,
    };
  };
  history: History;
}

export default (props: IProps) => {
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [blockNumber]: any = useBlockNumber(erpc);
  const [blocks, setBlocks]: [any, any] = useState();
  const theme = useTheme<Theme>();
  const victoryTheme = getTheme(theme);
  const { match, history } = props;
  const { block } = match.params;
  const blockNum = block !== undefined ? parseInt(block, 10) : blockNumber;
  const from = Math.max(blockNum - 99, 0);
  const to = blockNum;

  React.useEffect(() => {
    if (blockNum === undefined || blockNumber === undefined) {
      return;
    }
    if (blockNum > blockNumber) {
      history.push(`/stats/miners/${blockNumber}`);
    }
    if (blockNum < 0) {
      history.push('/stats/miners/0');
    }
  }, [blockNumber, blockNum, history]);

  React.useEffect(() => {
    if (!erpc) { return; }
    getBlocks(
      from,
      to,
      erpc,
    ).then((bl) => {
      setBlocks(_.compact(bl));
    });
  }, [from, to, erpc]);

  if (!blocks || blockNumber === undefined || blockNum > blockNumber) {
    return (<CircularProgress />);
  }

  return (
    <>
      <BlockPagination
        from={from}
        to={to}
        disablePrev={blockNum >= blockNumber}
        disableNext={blockNum === 0}
        onPrev={() => {
          const newQuery = blockNum + 100;
          props.history.push(`/stats/miners/${newQuery}`);
        }}
        onNext={() => {
          const newQuery = Math.max(blockNum - 100, 0);
          props.history.push(`/stats/miners/${newQuery}`);
        }}
      />
      <StatCharts blocks={blocks} victoryTheme={victoryTheme} />
      <MinerStats blocks={blocks} config={config} />
      <MinerStatsTable blocks={blocks} />
    </>
  );
};
