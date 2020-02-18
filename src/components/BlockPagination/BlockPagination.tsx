
import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';

interface IProps {
  from: number;
  to: number;
  disableNext?: boolean;
  disablePrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  style?: any;
}

const BlockPagination: React.FC<IProps> = (props) => {
  const {
    onPrev, disablePrev, onNext, disableNext, to, from,
  } = props;
  return (
    <Grid container>
      <Grid container justify="flex-end">
        <IconButton onClick={onPrev} disabled={disablePrev}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={onNext} disabled={disableNext}>
          <ArrowForwardIos />
        </IconButton>
      </Grid>
      <Grid container justify="flex-end">
        <Typography>
          Showing
          {(to - from) + 1}
          {' '}
          Block Range:
          <b>{to}</b>
          {' '}
          -
          {from}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default BlockPagination;
