import React from 'react';
import BigNumber from 'bignumber.js';
import { hexToNumber } from '@etclabscore/eserialize';
import { Grid } from '@material-ui/core';
import { VictoryBar, VictoryChart } from 'victory';
import { useTranslation } from 'react-i18next';
import ChartCard from '../ChartCard';

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 175,
  chartWidth: 350,
};

const blockMapGasUsed = (block: any) => ({
  x: hexToNumber(block.number),
  y: new BigNumber(block.gasUsed).dividedBy(1000000),
});

const blockMapTransactionCount = (block: any) => ({
  x: hexToNumber(block.number),
  y: block.transactions.length,
});

interface IProps {
  blocks: any[];
  victoryTheme?: any;
}

const StatCharts: React.FC<IProps> = ({ blocks, victoryTheme }) => {
  const { t } = useTranslation();
  return (
    <Grid item container spacing={3}>
      <Grid key="txChart" item xs={12} md={6} lg={6}>
        <ChartCard title={t('Transaction count')}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth} theme={victoryTheme as any}>
            <VictoryBar data={blocks.map(blockMapTransactionCount)} />
          </VictoryChart>
        </ChartCard>
      </Grid>
      <Grid key="gasUsed" item xs={12} md={6} lg={6}>
        <ChartCard title={t('Gas Used')}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth} theme={victoryTheme as any}>
            <VictoryBar data={blocks.map(blockMapGasUsed)} />
          </VictoryChart>
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default StatCharts;
