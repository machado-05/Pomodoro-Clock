import React, { useEffect, useRef, useState } from 'react';

const PomodoroClock = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [currentTimer, setCurrentTimer] = useState('Session');
    const audioRef = useRef(null);

    const incrementSession = () => {
        if (!isRunning) {
            setSessionLength(prev => {
                if (prev < 60) {
                    const newSessionLength = prev + 1;
                    setTimeLeft(currentTimer === 'Session' ? newSessionLength * 60 : timeLeft);
                    return newSessionLength;
                }
                return prev;
            })
        }
    };
    const decrementSession = () => {
        if (!isRunning) {
            setSessionLength(prev => {
                if (prev > 1) {
                    const newSessionLength = prev - 1;
                    setTimeLeft(currentTimer === 'Session' ? newSessionLength * 60 : timeLeft);
                    return newSessionLength;
                }
                return prev;
            });
        }
    };
    const incrementBreak = () => {
        if (!isRunning) {
            setBreakLength(prev => {
                if (prev < 60) {
                    return prev + 1;
                }
                return prev;
            });
        }
    };
    const decrementBreak = () => {
        if (!isRunning) {
            setBreakLength(prev => {
                if (prev > 1) {
                    return prev - 1;
                }
                return prev;
            });
        }
    };

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
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 0) {
                        if (audioRef.current) {
                            audioRef.current.play();
                        }
                        if (currentTimer === 'Session') {
                            // Switch to break
                            setCurrentTimer('Break');
                            setTimeLeft(breakLength * 60);
                        } else {
                            // Switch to session
                            setCurrentTimer('Session');
                            setTimeLeft(sessionLength * 60);
                        }
                        
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, currentTimer, breakLength, sessionLength]);

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
            {/* Audio element for the timer beep */}
            <audio
                id="beep"
                ref={audioRef}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                preload="auto"
            />

        </div>
    );
};

export default PomodoroClock;