import { createMachine, interpret } from 'xstate';

const alarmClockMachine = createMachine(
  {
    id: 'alarmClock',
    initial: 'idle',
    states: {
      idle: {
        on: {
          ALARM: { target: 'alarming' },
        },
      },
      alarming: {
        on: {
          STOP: { target: 'idle' },
        },
        activities: ['beeping'],
      },
    },
  },
  {
    activities: {
      beeping: (context, event) => {
        const beep = () => {
          console.log('beep');
        };

        beep();

        const beepInterval = setInterval(beep, 1000);

        return () => clearInterval(beepInterval);
      },
    },
  }
);

const alarmClockMachineService = interpret(alarmClockMachine);

alarmClockMachineService.start();

alarmClockMachineService.send({ type: 'ALARM' });

setTimeout(() => {
  alarmClockMachineService.send({ type: 'STOP' });
}, 3000);
