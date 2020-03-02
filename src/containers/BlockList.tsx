import { CircularProgress, Grid, IconButton } from '@material-ui/core';
import * as React from 'react';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
import useMultiGethStore from '../stores/useMultiGethStore';
import BlockList from '../components/BlockList';
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

export default function BlockListContainer(props: IProps) {
  const { from, to, style } = props;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [blocks, setBlocks] = React.useState();
  const {
    onPrev, disablePrev, onNext, disableNext,
  } = props;
  React.useEffect(() => {
    if (!erpc) { return; }
    getBlocks(from, to, erpc).then((bl) => {
      const removeNull = bl.filter((bloc: any) => !!bloc);
      setBlocks(removeNull);
    });
  }, [from, to, erpc]);

  if (!blocks) {
    return <CircularProgress />;
  }
  return (
    <div style={style}>
      <Grid container justify="flex-start">
        <Grid item xs={6}>
          <h2>Recent Blocks</h2>
        </Grid>

        <Grid container xs={6} justify="flex-end">
          <IconButton onClick={onPrev} disabled={disablePrev}>
            <ArrowBackIos />
          </IconButton>
          <IconButton onClick={onNext} disabled={disableNext}>
            <ArrowForwardIos />
          </IconButton>
        </Grid>
      </Grid>
      <BlockList blocks={blocks} />
    </div>
  );
}
