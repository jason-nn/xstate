import { assign, createMachine } from 'xstate';

const stopLightMachine = createMachine(
  {
    id: 'stopLight',
    initial: 'red',
    context: {
      delayMultiplier: 1,
    },
    on: {
      INCREASE_MULTIPLIER: {
        actions: ['increaseMultiplier'],
      },
    },
    states: {
      red: {
        after: {
          RED_TIMER: { target: 'green' },
        },
      },
      green: {
        after: {
          GREEN_TIMER: { target: 'yellow' },
        },
      },
      yellow: {
        after: {
          YELLOW_TIMER: { target: 'red' },
        },
      },
    },
  },
  {
    actions: {
      increaseMultiplier: assign({
        delayMultiplier: (context, event) => context.delayMultiplier + 1,
      }),
    },
    delays: {
      RED_TIMER: (context, event) => context.delayMultiplier * 4000,
      GREEN_TIMER: (context, event) => context.delayMultiplier * 3000,
      YELLOW_TIMER: (context, event) => context.delayMultiplier * 1000,
    },
  }
);
