import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularIndeterminate() {
  return (
    <div>
      <CircularProgress color="secondary" thickness={5} />
    </div>
  );
}
