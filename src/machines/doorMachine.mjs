import { createMachine } from 'xstate';

const doorMachine = createMachine({
  id: 'door',
  initial: 'locked',
  states: {
    locked: {
      id: 'locked',
      on: {
        UNLOCK: { target: 'unlocked' },
      },
    },
    unlocked: {
      initial: 'closed',
      states: {
        closed: {
          on: {
            OPEN: { target: 'opened' },
            // LOCK: { target: '#door.locked' },
            LOCK: { target: '#locked' },
          },
        },
        opened: {
          on: {
            CLOSE: { target: 'closed' },
          },
        },
      },
    },
  },
});
