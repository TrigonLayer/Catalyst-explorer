import { CircularProgress, Grid } from '@material-ui/core';
import * as React from 'react';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';
import { hexToNumber } from '@etclabscore/eserialize';
import useMultiGethStore from '../stores/useMultiGethStore';
import getBlocks from '../helpers';
import BlockCard from '../components/BlockCard';

interface IProps {
  from: number;
  to: number;
  style?: any;
}

export default function BlockCardListContainer(props: IProps) {
  const { from, to, style } = props;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [blocks, setBlocks]: [any, any] = React.useState();
  React.useEffect(() => {
    let isSubscribed = true;
    if (!erpc) { return; }
    if (isSubscribed) {
      getBlocks(from, to, erpc).then((bs) => {
        setBlocks(bs);
      });
    }
    // eslint-disable-next-line consistent-return
    return () => {
      isSubscribed = false;
    };
  }, [from, to]);

  if (!blocks) {
    return <CircularProgress />;
  }
  return (
    <Grid container spacing={2} style={style}>
      {
        blocks.sort((a: any,
          b: any) => hexToNumber(b.number) - hexToNumber(a.number)).map((block: any) => (
            <Grid item xs={12} sm={4} key={block.hash}>
              <BlockCard block={block} />
            </Grid>
        ))
      }
    </Grid>
  );
}
