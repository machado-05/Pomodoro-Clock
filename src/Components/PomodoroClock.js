import React, { useState } from 'react';

const PomodoroClock = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);

    const incrementSession = () => setSessionLength(prev => prev + 1);
    const decrementSession = () => setSessionLength(prev => (prev > 1 ? prev - 1 : 1));
    const incrementBreak = () => setBreakLength(prev => prev + 1);
    const decrementBreak = () => setBreakLength(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div>
            <h1>Pomodoro Clock</h1>
            <div id="timer-label">Session</div>
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
        </div>
    );
};

export default PomodoroClock;