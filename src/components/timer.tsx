import { useEffect, useState } from "react";
import {
    ButtonItem
  } from "decky-frontend-lib";
import {
  BsFillPlayFill,
  BsFillStopFill,
  BsFillPauseFill,
  BsFillReplyFill
} from "react-icons/bs";
import { State } from "../utils/states";

export default function Timer() {
  const [time, setTime] = useState<string>("00:00:00.00");
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [lastTime, setLastTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeState, setTimeState] = useState<State>(State.READY);

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
  };

  const formatSeconds = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false
    });
  };

  const countTime = () => {
    const x = Date.now() - startTime;
    let s = formatSeconds((x / 1000) % 60);
    let m = formatNumber(Math.floor(x / 60000) % 60);
    let h = formatNumber(Math.floor(x / 3.6e6));
    setTime(h + ":" + m + ":" + s);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isTimerRunning) {
        countTime();
      }
    }, 10); // update about every hundredth of a second

    return () => window.clearInterval(interval);
  });

  return (
    <div className="page">
      <div className="resetTime" id="time">
        {time}
      </div>
      <ButtonItem
          layout="below"
          onClick={() => {
            setTimeState(State.READY);
            setIsTimerRunning(false);
            setTime("00:00:00.00");
          }}
        >
          <BsFillReplyFill />
        </ButtonItem>
      <ButtonItem
        layout="below"
        onClick={() => {
          if (timeState === State.READY) {
            setStartTime(Date.now());
          } else if (timeState === State.PAUSED) {
            setStartTime(startTime + (Date.now() - lastTime));
          }
          setTimeState(State.RUNNING);
          setIsTimerRunning(true);
        }}
      >
        <BsFillPlayFill />
      </ButtonItem>
      <ButtonItem
        layout="below"
        onClick={() => {
          setTimeState(State.READY);
          setIsTimerRunning(false);
        }}
      >
        <BsFillStopFill />
      </ButtonItem>
      <ButtonItem
        layout="below"
        onClick={() => {
          setTimeState(State.PAUSED);
          setLastTime(Date.now());
          setIsTimerRunning(false);
        }}
      >
        <BsFillPauseFill />
      </ButtonItem>
    </div>
  );
}
