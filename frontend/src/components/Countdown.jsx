import "../styles/Countdown.css";
import sales from "../images/sales.png"
import { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);

    if (isNaN(target)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className='sales-coundown'>
      <div className="sales-img">
        <img src={sales} alt="sales image" />
      </div>
      <div className="countdown">
        <h1>30% discount on all items</h1>
        {timeLeft.days > 0 && (
          <>
            <div className="time-container">
              <span className="time days">{formatNumber(timeLeft.days)}</span>
              <span className="time-label">Days</span>
            </div>
            <span className="colon">:</span>
          </>
        )}
        <div className="time-container">
          <span className="time hours">{formatNumber(timeLeft.hours)}</span>
          <span className="time-label">Hours</span>
        </div>
        <span className="colon">:</span>
        <div className="time-container">
          <span className="time minutes">{formatNumber(timeLeft.minutes)}</span>
          <span className="time-label">Minutes</span>
        </div>
        <span className="colon">:</span>
        <div className="time-container">
          <span className="time seconds">{formatNumber(timeLeft.seconds)}</span>
          <span className="time-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
