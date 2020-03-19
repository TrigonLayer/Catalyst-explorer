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
      summary: 'Testnet node 3',
    },
    {
      name: 'Node 5',
      url: 'http://77.68.110.49:5005/api/eth/request',
      summary: 'Non POA node',
    },
    {
      name: 'local',
      url: 'http://localhost:5005/api/eth/request',
      summary: 'your local node',
    },
  // {
  //   name: 'Alex',
  //   url: 'http://192.168.1.232:5005/api/eth/request',
  //   summary: 'Alex\'s node',
  // },
  // {
  //   name: 'Stephen',
  //   url: 'http://192.168.1.233:5005/api/eth/request',
  //   summary: 'Stephen\'s node',
  // },
  // {
  //   name: 'Sudhir',
  //   url: 'http://192.168.1.40:5005/api/eth/request',
  //   summary: 'Sudhir\'s node',
  // }
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
