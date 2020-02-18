import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';
import { useParams } from 'react-router-dom';
import { useBlockNumber } from '../helpers';
import BlockList from './BlockList';
import useMultiGethStore from '../stores/useMultiGethStore';

interface IUrlParams {
  number: string | undefined;
}

export default function NodeView(props: any) {
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [blockNumber]: any = useBlockNumber(erpc);
  const urlParams = useParams<IUrlParams>();
  const blockNum: any = (urlParams && urlParams.number !== undefined) ? urlParams.number : blockNumber;
  const { history } = props;

  React.useEffect(() => {
    if (blockNum === undefined || blockNumber === undefined) {
      return;
    }
    if (blockNum > blockNumber) {
      props.history.push(`/blocks/${blockNumber}`);
    }
    if (blockNum < 0) {
      props.history.push('/blocks/0');
    }
  }, [blockNumber, blockNum, history]);
  if (blockNumber === undefined || blockNum > blockNumber) {
    return (<CircularProgress />);
  }
  return (
    <BlockList
      from={Math.max(blockNum - 14, 0)}
      to={(urlParams.number !== undefined ? urlParams.number : blockNumber)}
      disablePrev={blockNum >= blockNumber}
      disableNext={blockNum === 0}
      onPrev={() => {
        const newQuery = blockNum + 15;
        props.history.push(`/blocks/${newQuery}`);
      }}
      onNext={() => {
        const newQuery = Math.max(blockNum - 15, 0);
        props.history.push(`/blocks/${newQuery}`);
      }}
    />
  );
}
