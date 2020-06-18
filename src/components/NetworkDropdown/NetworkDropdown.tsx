import * as React from 'react';
import {
  Menu, MenuItem, Tooltip, Button, Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { TNetwork } from '../../helpers/availableServiceToNetwork';

interface IProps {
  networks: TNetwork[];
  onChange: (type: string, url: string) => any;
  selectedNetwork?: TNetwork;
  setSelectedNetwork?: (network: TNetwork) => void;
}

interface INetwork {
  name: string;
  url: string;
  summary?: string;
}

const NetworkDropdown: React.FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { selectedNetwork, setSelectedNetwork, onChange } = props;
  // const [selected, setSelected] = React.useState<'service-runner' | 'ethereum-rpc' | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (network: INetwork) => {
    setAnchorEl(null);
    // if (setSelectedNetwork) {
    //   setSelectedNetwork(network);
    // }
    setSelectedNetwork(network);
    onChange('ethereum-rpc', network.url);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const networks = [
    {
      name: 'Dev Testnet',
      url: 'http://77.68.110.78:5005/api/eth/request',
      summary: 'Development Testnet',
    },
    {
      name: 'Node 1',
      url: 'http://77.68.110.194:5005/api/eth/request',
      summary: 'Testnet node 1',
    },
    {
      name: 'Node 2',
      url: 'http://77.68.110.195:5005/api/eth/request',
      summary: 'Testnet node 2',
    },
    {
      name: 'Node 3',
      url: 'http://77.68.110.196:5005/api/eth/request',
      summary: 'Testnet node 3',
    },
    {
      name: 'Node 4',
      url: 'http://77.68.110.197:5005/api/eth/request',
      summary: 'Testnet node 4',
    },
    {
      name: 'local',
      url: 'http://localhost:5005/api/eth/request',
      summary: 'your local node',
    },
  ];

  return (
    <>

      <Tooltip title={t('Change Network')}>
        <Button onClick={handleClick}>
          {t('Network')}
        </Button>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {networks.map((network, i) => (
          <MenuItem
            selected={selectedNetwork && selectedNetwork.name === network.name}
            onClick={(event) => handleMenuItemClick(network)}
          >
            <div>
              <Typography variant="body1">{network.name}</Typography>
              <Typography variant="caption">{network.summary}</Typography>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NetworkDropdown;
