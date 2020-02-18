import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import EthereumJSONRPC from '@etclabscore/ethereum-json-rpc';
import TxView from '../components/TxView';
import useMultiGethStore from '../stores/useMultiGethStore';

export default function TransactionContainer(props: any) {
  const { match } = props;
  const { hash } = match.params;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [transaction, setTransaction]: [any, any] = React.useState();
  const [receipt, setReceipt] : [any, any] = React.useState();

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_getTransactionByHash(hash).then(setTransaction);
  }, [hash, erpc]);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_getTransactionReceipt(hash).then(setReceipt);
  }, [hash, erpc]);

  if (!transaction || !receipt) {
    return (<CircularProgress />);
  }

  return (<TxView tx={transaction} receipt={receipt} />);
}
