# Pomodoro Clock

This is a Pomodoro Clock web application built with React. It allows users to manage their work and break intervals using the Pomodoro Technique. The app features buttons to increase or decrease session and break lengths, and users can start, stop, and reset the timer.

## Features

- Increase and decrease session length.
- Increase and decrease break length.
- Start, stop, and reset the timer.
- Continuous increment/decrement by holding the buttons.
- Visual countdown timer.
- Sound notification at the end of each session and break.

## Usage
- Session Length: Use the + and - buttons to adjust the session length. Hold the buttons for continuous increment/decrement.
- Break Length: Use the + and - buttons to adjust the break length. Hold the buttons for continuous increment/decrement.
- Start/Stop: Click the Start/Stop button to start or stop the timer.
- Reset: Click the Reset button to reset the timer, session length, and break length to default values.

## Timer Logic
The timer logic checks if the timer is running and updates the timeLeft state every second. When the timer reaches zero, it switches between the session and break periods and plays a beep sound:

```jsx
useEffect(() => {
    if (isRunning) {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    if (audioRef.current) {
                        audioRef.current.play();
                    }
                    if (currentTimer === 'Session') {
                        setCurrentTimer('Break');
                        setTimeLeft(breakLength * 60);
                    } else {
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
```
Project Link: [https://machado-05.github.io/Pomodoro-Clock/](https://machado-05.github.io/Pomodoro-Clock/)

**PS:** Some of the tests may not work as expected because I opted for the user to hold the buttons instead of clicking them repeatedly.



