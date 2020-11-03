import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  timeBubble: {
    backgroundColor: 'black',
    borderRadius: '5px',
    margin: '3px',
    textAlign: 'center',
    '@media(max-width: 400px)': {
      fontSize: '14px',
    },
    '@media(max-width: 340px)': {
      fontSize: '12px',
    },
  },
});

const CountdownTimer = () => {
  const classes = useStyles();
  const albumReleaseDate = new Date(2020, 10, 19, 22);
  const [currentTime, setCurrentTime] = useState(null);
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    const checkCurrentTime = setInterval(() => setCurrentTime(new Date().getTime()), 10);
    return () => clearInterval(checkCurrentTime);
  }, []);

  useEffect(() => {
    const timeDifference = albumReleaseDate.getTime() - currentTime;

    const daysTemp = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const daysRemainder = timeDifference % (1000 * 60 * 60 * 24);
    setDays(daysTemp);

    const hoursTemp = Math.floor(daysRemainder / (1000 * 60 * 60));
    const hoursRemainder = daysRemainder % (1000 * 60 * 60);
    setHours(hoursTemp);

    const minutesTemp = Math.floor(hoursRemainder / (1000 * 60));
    const minutesRemainder = hoursRemainder % (1000 * 60);
    setMinutes(minutesTemp);

    const secondsTemp = Math.floor((minutesRemainder) / 1000) + 1;
    const secondsFormatted = secondsTemp === 60 ? 0 : secondsTemp;
    setSeconds(secondsFormatted);
  }, [currentTime]);

  return (
    <Grid container justify="center">
      <Grid item md={2} sm={2} xs={2}>
        <div className={classes.timeBubble}>
          <div>Days</div>
          <div>{days}</div>
        </div>
      </Grid>
      <Grid item md={2} sm={2} xs={2}>
        <div className={classes.timeBubble}>
          <div>Hours</div>
          <div>{hours}</div>
        </div>
      </Grid>
      <Grid item md={2} sm={2} xs={2}>
        <div className={classes.timeBubble}>
          <div>Minutes</div>
          <div>{minutes}</div>
        </div>
      </Grid>
      <Grid item md={2} sm={2} xs={2}>
        <div className={classes.timeBubble}>
          <div>Seconds</div>
          <div>{seconds}</div>
        </div>
      </Grid>
    </Grid>
  )
}

export default CountdownTimer