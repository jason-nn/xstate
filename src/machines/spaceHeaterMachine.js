import { createMachine } from 'xstate';

const spaceHeaterMachine = createMachine({
  id: 'spaceHeater',
  initial: 'poweredOff',
  states: {
    poweredOff: {
      on: {
        TOGGLE_POWER: { target: 'poweredOn.history' },
      },
    },
    poweredOn: {
      on: {
        TOGGLE_POWER: { target: 'poweredOff' },
      },
      type: 'parallel',
      states: {
        heated: {
          initial: 'lowHeat',
          states: {
            lowHeat: {
              on: {
                TOGGLE_HEAT: { target: 'highHeat' },
              },
            },
            highHeat: {
              on: {
                TOGGLE_HEAT: { target: 'lowHeat' },
              },
            },
          },
        },
        oscillating: {
          initial: 'disabled',
          states: {
            disabled: {
              on: {
                TOGGLE_OSCILLATION: { target: 'enabled' },
              },
            },
            enabled: {
              on: {
                TOGGLE_OSCILLATION: { target: 'disabled' },
              },
            },
          },
        },
        history: { type: 'history', history: 'deep' },
        // history is shallow by default and will not remember child states for more complex states
        // can be set to deep to allow remembering of all child states
      },
    },
  },
});
