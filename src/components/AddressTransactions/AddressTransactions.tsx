import * as React from 'react';
import { Typography, IconButton, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import TxList from '../TxList';

export interface IProps {
  transactions: any[];
  from: number;
  to: number;
  disableNext?: boolean;
  disablePrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  style?: any;
}

const AddressTransactions: React.FC<IProps> = (props) => {
  const { t } = useTranslation();
  const {
    style,
    onPrev,
    disablePrev,
    onNext,
    disableNext,
    to,
    from,
    transactions,
  } = props;
  return (
    <div style={style}>
      <Grid container justify="flex-end">
        <IconButton onClick={onPrev} disabled={disablePrev}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={onNext} disabled={disableNext}>
          <ArrowForwardIos />
        </IconButton>
      </Grid>
      <Grid container justify="flex-end">
        <Typography>
          Showing block range:
          {' '}
          {to}
          {' '}
          -
          {' '}
          {from}
        </Typography>
      </Grid>
      <TxList transactions={transactions || []} showBlockNumber />
      {(!transactions || transactions.length === 0)
        && (
        <Grid container style={{ padding: '15px' }}>
          <Typography>{t('No Transactions for this block range.')}</Typography>
        </Grid>
        )}
    </div>
  );
};

export default AddressTransactions;
