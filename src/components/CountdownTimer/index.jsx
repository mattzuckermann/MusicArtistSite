import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  timeBubble: {
    backgroundColor: '#1b1b1b',
    borderRadius: '5px',
    margin: '3px 5px',
    padding: '3px 0px',
    textAlign: 'center',
    '@media(max-width: 400px)': {
      fontSize: '14px',
    },
    '@media(max-width: 340px)': {
      fontSize: '12px',
    },
  },
  lineDivide: {
    height: '5px',
    margin: '5px 25px',
    backgroundColor: 'white',
    '@media(max-width: 600px)': {
      margin: '5px 8px',
    },
  },
});

const CountdownTimer = ({ awaitedTime }) => {
  const classes = useStyles();
  const [currentTime, setCurrentTime] = useState(null);
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  const timeArray = [
    { Days: days },
    { Hours: hours },
    { Minutes: minutes },
    { Seconds: seconds },
  ];

  useEffect(() => {
    const checkCurrentTime = setInterval(() => {
      setCurrentTime(new Date().getTime(), 10);
    });
    return () => clearInterval(checkCurrentTime);
  }, []);

  useEffect(() => {
    const timeDifference = awaitedTime.valueOf() - currentTime;

    const daysTemp = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const daysRemainder = timeDifference % (1000 * 60 * 60 * 24);
    setDays(daysTemp);

    const hoursTemp = Math.floor(daysRemainder / (1000 * 60 * 60));
    const hoursRemainder = daysRemainder % (1000 * 60 * 60);
    setHours(hoursTemp);

    const minutesTemp = Math.floor(hoursRemainder / (1000 * 60));
    const minutesRemainder = hoursRemainder % (1000 * 60);
    setMinutes(minutesTemp);

    const secondsTemp = Math.floor(minutesRemainder / 1000);
    setSeconds(secondsTemp);

    if (timeDifference <= 0) {
      window.location.reload();
      clearInterval(checkCurrentTime);
    }
  }, [currentTime]);

  return (
    <Grid
      container
      justify="center"
      style={{ marginBottom: '-60px', position: 'relative', zIndex: 100 }}
    >
      {timeArray.map(value => (
        <Grid key={`bubble-${value}`} item md={2} sm={2} xs={3}>
          <div className={classes.timeBubble}>
            <div>{Object.keys(value)}</div>
            <hr className={classes.lineDivide} />
            <div>{Object.values(value)}</div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default CountdownTimer;
