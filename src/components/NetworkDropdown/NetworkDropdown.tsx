import * as React from 'react';
import {
  Menu, MenuItem, Tooltip, Button, Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { TNetwork } from '../../helpers/availableServiceToNetwork';
import networks from '../../helpers/networks';

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
