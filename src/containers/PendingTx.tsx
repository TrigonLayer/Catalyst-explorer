import { CircularProgress, Grid, IconButton } from '@material-ui/core';
import * as React from 'react';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
import useMultiGethStore from '../stores/useMultiGethStore';
import TxList from '../components/TxList';
import getBlocks from '../helpers';

interface IProps {
  from: number;
  to: number;
  disablePrev: boolean;
  disableNext: boolean;
  style?: any;
  onNext?: any;
  onPrev?: any;
}

export default function PendingTxContainer(props: IProps) {
  const { from, to, style } = props;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [pending, setPending] = React.useState();
  const {
    onPrev, disablePrev, onNext, disableNext,
  } = props;
  React.useEffect(() => {
    if (!erpc) { return; }
    getBlocks(from, to, erpc).then((bl) => {
      const removeNull = bl.filter((bloc: any) => !!bloc);
      setPending(removeNull);
    });
  }, [erpc]);

  if (!pending) {
    return <CircularProgress />;
  }
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
      <TxList transactions={pending} />
    </div>
  );
}
