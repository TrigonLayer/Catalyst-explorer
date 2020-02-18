import * as React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';

interface IProps {
  children: any;
  title: string;
}

const ChartCard: React.FC<IProps> = ({ title, children }) => (
  <Card style={{ background: 'transparent' }} elevation={0}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      {children}
    </CardContent>
  </Card>
);

export default ChartCard;
