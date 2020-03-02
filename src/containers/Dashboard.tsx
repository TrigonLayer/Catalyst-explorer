import {
  Grid, Typography, CircularProgress, Theme, Button,
} from '@material-ui/core';
import * as React from 'react';
import useInterval from 'use-interval';
import { useTheme } from '@material-ui/styles';
import { hexToNumber } from '@etclabscore/eserialize';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';
import { useTranslation } from 'react-i18next';
import { ArrowForwardIos } from '@material-ui/icons';
import Web3 from 'web3';
import useMultiGethStore from '../stores/useMultiGethStore';
import { weiToGwei } from '../components/formatters';
import HashRate from '../components/HashRate';
import getBlocks, { useBlockNumber } from '../helpers';
import getTheme from '../themes/victoryTheme';
import ChartCard from '../components/ChartCard';
import BlockListContainer from './BlockList';
import PendingContainer from './PendingTx';
import StatCharts from '../components/StatCharts';

const { useState } = React;

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

export default (props: any) => {
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const theme = useTheme<Theme>();
  const victoryTheme = getTheme(theme);
  const [blockNumber]: any = useBlockNumber(erpc);
  const [chainId, setChainId]: [any, any] = useState();
  const [block, setBlock]: [any, any] = useState();
  const [blocks, setBlocks]: [any, any] = useState();
  const [gasPrice, setGasPrice]: [any, any] = useState();
  const [syncing, setSyncing]: [any, any] = useState();
  const [peerCount, setPeerCount]: [any, any] = useState();
  const [pendingTransctions, setPendingTransactions]: [any, any] = useState();

  const [pendingTransctionsLength, setPendingTransactionsLength] = useState(0);
  const { t } = useTranslation();


  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_pendingTransactions().then((p) => {
      console.log('pending: ', p);
      setPendingTransactions(p);
      setPendingTransactionsLength(p.length);
    });
  }, [erpc]);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_chainId().then(setChainId);
  }, [erpc]);

  React.useEffect(() => {
    if (!erpc || blockNumber === undefined) { return; }
    console.log(blockNumber);
    erpc.eth_getBlockByNumber(blockNumber, true).then((result: any) => {
      console.log(result);
      setBlock(result);
    })
      .catch((e: any) => console.log(e));
    // web3.eth.getBlock(blockNumber, true).then(setBlock);
  }, [blockNumber, erpc]);

  React.useEffect(() => {
    if (!erpc || blockNumber === null) { return; }
    getBlocks(
      Math.max(blockNumber - config.blockHistoryLength + 1, 0),
      blockNumber,
      erpc,
    ).then((bl) => {
      const removeNull = bl.filter((bloc: any) => !!bloc);
      setBlocks(removeNull);
    });
  }, [blockNumber, erpc]);

  useInterval(() => {
    if (!erpc) { return; }

    erpc.eth_syncing().then(setSyncing);
  }, 10000, true);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.net_peerCount().then(setPeerCount);
  }, [erpc]);

  // React.useEffect(() => {
  //   if (!erpc) { return; }
  //   erpc.eth_gasPrice().then(setGasPrice);
  // }, [erpc]);

  if (!blocks) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Grid container spacing={3} direction="column">
        <Grid item container justify="space-between">
          <Grid item key="blockHeight">
            <ChartCard title={t('Block Height')}>
              <Typography variant="h4">{blockNumber}</Typography>
            </ChartCard>
          </Grid>
          <Grid key="chainId" item>
            <ChartCard title={t('Chain ID')}>
              <Typography variant="h4">{hexToNumber(chainId)}</Typography>
            </ChartCard>
          </Grid>
          {syncing
            && (
            <div key="syncing">
              <ChartCard title={t('Syncing')}>
                {typeof syncing === 'object' && syncing.currentBlock
                  && (
                  <Typography variant="h4">
                    {hexToNumber(syncing.currentBlock)}
                    {' '}
                    /
                    {' '}
                    {hexToNumber(syncing.highestBlock || '0x0')}
                  </Typography>
                  )}
              </ChartCard>
            </div>
            )}
          <Grid key="gasPrice" item>
            <ChartCard title={t('Gas Price')}>
              <Typography variant="h4">
                {weiToGwei(hexToNumber(gasPrice))}
                {' '}
                Gwei
              </Typography>
            </ChartCard>
          </Grid>
          {/* <Grid key="hRate" item>
            <ChartCard title={t('Network Hash Rate')}>
              {block
                && (
                <HashRate block={block} blockTime={config.blockTime}>
                  {(hashRate: any) => (
                    <Typography variant="h4">
                      {hashRate}
                      {' '}
                      GH/s
                    </Typography>
                  )}
                </HashRate>
                )}
            </ChartCard>
          </Grid> */}
          <Grid key="pending-tx" item>
            <ChartCard title={t('Pending Transactions')}>
              <Typography variant="h4">{pendingTransctionsLength}</Typography>
            </ChartCard>
          </Grid>
          <Grid key="peers" item>
            <ChartCard title={t('Peers')}>
              <Typography variant="h4">{hexToNumber(peerCount)}</Typography>
            </ChartCard>
          </Grid>
        </Grid>
      </Grid>
      <StatCharts victoryTheme={victoryTheme} blocks={blocks} />
      <Grid container justify="flex-end">
        <Button
          color="primary"
          variant="outlined"
          endIcon={<ArrowForwardIos />}
          onClick={() => props.history.push('/stats/miners')}
        >
          More Stats

        </Button>
      </Grid>
      <br />

      <PendingContainer />

      <BlockListContainer
        from={Math.max(blockNumber - 14, 0)}
        to={blockNumber}
        disablePrev
        disableNext={blockNumber === 0}
        onNext={() => {
          props.history.push(`/blocks/${blockNumber - 15}`);
        }}
        style={{ marginTop: '30px' }}
      />
    </div>
  );
};
