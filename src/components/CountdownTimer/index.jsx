import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  timeBubble: {
    backgroundColor: '#1b1b1b',
    borderRadius: '5px',
    margin: '3px',
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

  useEffect(() => {
    const checkCurrentTime = setInterval(() => setCurrentTime(new Date().getTime()), 10);
    return () => clearInterval(checkCurrentTime);
  }, []);

  useEffect(() => {
    const timeDifference = awaitedTime.getTime() - currentTime;

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
    <Grid container justify="center">
      <Grid item md={2} sm={2} xs={2}>
        <div className={classes.timeBubble}>
          <div>Days</div>
          <hr className={classes.lineDivide} />
          <div>{days}</div>
        </div>
      </Grid>
      <Grid item md={2} sm={2} xs={2}>
        <div className={classes.timeBubble}>
          <div>Hours</div>
          <hr className={classes.lineDivide} />
          <div>{hours}</div>
        </div>
      </Grid>
      <Grid item md={2} sm={2} xs={2}>
        <div className={classes.timeBubble}>
          <div>Minutes</div>
          <hr className={classes.lineDivide} />
          <div>{minutes}</div>
        </div>
      </Grid>
      <Grid item md={2} sm={2} xs={2}>
        <div className={classes.timeBubble}>
          <div>Seconds</div>
          <hr className={classes.lineDivide} />
          <div>{seconds}</div>
        </div>
      </Grid>
    </Grid>
  )
}

export default CountdownTimer