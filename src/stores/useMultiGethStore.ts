import { createStore } from 'reusable';
import { useQueryParam, StringParam } from 'use-query-params';
import useMultiGeth from '../hooks/useMultiGeth';
import useServiceRunnerStore from './useServiceRunnerStore';
import networkList from '../helpers/networks';

export default createStore(() => {
  const [serviceRunner, serviceRunnerUrl] = useServiceRunnerStore();
  const [networkQuery] = useQueryParam('network', StringParam);
  const [rpcUrlQuery] = useQueryParam('rpcUrl', StringParam);
  const rpcUrl = networkQuery ? networkList.find(({ name }) => name === networkQuery)?.url : null;
  return useMultiGeth(serviceRunner, serviceRunnerUrl, '1.9.9', networkQuery || 'mainnet', rpcUrlQuery || rpcUrl);
});
