import { createStore } from 'reusable';
import { useQueryParam, StringParam } from 'use-query-params';
import useMultiGeth from '../hooks/useMultiGeth';
import useServiceRunnerStore from './useServiceRunnerStore';

export default createStore(() => {
  const [serviceRunner, serviceRunnerUrl] = useServiceRunnerStore();
  const [networkQuery] = useQueryParam('network', StringParam);
  const [rpcUrlQuery] = useQueryParam('rpcUrl', StringParam);
  return useMultiGeth(serviceRunner, serviceRunnerUrl, '1.9.9', networkQuery || 'mainnet', rpcUrlQuery);
});
