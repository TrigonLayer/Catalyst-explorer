import { CircularProgress, Grid, IconButton } from '@material-ui/core';
import * as React from 'react';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
import { initReactI18next } from 'react-i18next';
import useMultiGethStore from '../stores/useMultiGethStore';
import TxList from '../components/TxList';
import getBlocks from '../helpers';
import { mockTxs } from '../helpers/mockTxs';

// interface IProps {
//   from: number;
//   to: number;
//   disablePrev: boolean;
//   disableNext: boolean;
//   style?: any;
//   onNext?: any;
//   onPrev?: any;
// }

function getPending() {

}

export default function PendingTxContainer() {
  // const { from, to, style } = props;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [pending, setPending]: [any, any] = React.useState([]);
  const [to, setTo]: [any, any] = React.useState(5);
  React.useEffect(() => {
    setPending(mockTxs);
  }, []);
  // const {
  //   onPrev, disablePrev, onNext, disableNext,
  // } = props;
  // React.useEffect(() => {
  //   if (!erpc) { return; }
  //   getBlocks(from, to, erpc).then((bl) => {
  //     const removeNull = bl.filter((bloc: any) => !!bloc);
  //     setPending(removeNull);
  //   });
  // }, [erpc]);

  // if (!pending) {
  //   return <CircularProgress />;
  // }

  if (pending.length === 0) return null;

  return (
    <div>
      <Grid container justify="flex-start">
        <Grid item xs={6}>
          <h2>Pending Transactions</h2>
        </Grid>
        <Grid container xs={6} justify="flex-end">
          <IconButton onClick={() => setTo(to - 5)} disabled={to <= 5}>
            <ArrowBackIos />
          </IconButton>
          <IconButton onClick={() => setTo(to + 5)} disabled={pending.length < to}>
            <ArrowForwardIos />
          </IconButton>
        </Grid>
      </Grid>
      <TxList transactions={pending.slice(to - 5, to)} />
    </div>
  );
}
