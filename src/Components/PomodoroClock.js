import React, { useEffect, useState } from 'react';

const PomodoroClock = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [currentTimer, setCurrentTimer] = useState('Session');
    const [audio] = useState(new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'));

    const incrementSession = () => {
        if (!isRunning) {
            setSessionLength(prev => prev + 1);
            setTimeLeft((prev => (currentTimer === 'Session' ? (prev + 60) : prev)));
        }
    };
    const decrementSession = () => {
        if (!isRunning && sessionLength > 1) {
            setSessionLength(prev => prev - 1);
            setTimeLeft(prev => (currentTimer === 'Session' ? (prev - 60) : prev));
        }
    };
    const incrementBreak = () => {
        if (!isRunning) {
            setBreakLength(prev => prev + 1);
        }
    }
    const decrementBreak = () => setBreakLength(prev => (prev > 1 ? prev - 1 : 1));

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleStartStop = () => {
        setIsRunning(prev => !prev);
    }

    const handleReset = () => {
        setBreakLength(5);
        setSessionLength(25);
        setCurrentTimer('Session');
        setTimeLeft(25 * 60);
        setIsRunning(false);
        audio.pause();
        audio.currentTime = 0;
    }

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 0) {
                        if (currentTimer === 'Session') {
                            setCurrentTimer('Break');
                            setTimeLeft(breakLength * 60);
                        } else {
                            setCurrentTimer('Session');
                            setTimeLeft(sessionLength * 60);
                        }
                        audio.play();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, currentTimer, breakLength, sessionLength, audio]);

    return (
        <div>
            <h1>Pomodoro Clock</h1>
            <div id="timer-label">{currentTimer}</div>
            <span id="time-left">{formatTime(timeLeft)}</span>
            <div id="break-label">Break Length</div>
            <div>
                <button id="break-decrement" onClick={decrementBreak}>-</button>
                <span id="break-length">{breakLength}</span>
                <button id="break-increment" onClick={incrementBreak}>+</button>
            </div>
            <div id="session-label">Session Length</div>
            <div>
                <button id="session-decrement" onClick={decrementSession}>-</button>
                <span id="session-length">{sessionLength}</span>
                <button id="session-increment" onClick={incrementSession}>+</button>
            </div>

            <button id="start_stop" onClick={handleStartStop}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <button id="reset" onClick={handleReset}>
                Reset
            </button>

        </div>
    );
};

export default PomodoroClock;