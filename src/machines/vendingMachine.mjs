import { assign, createMachine } from 'xstate';

const vendingMachine = createMachine(
  {
    id: 'vendingMachine',
    initial: 'idle',
    context: {
      deposited: 0,
    },
    states: {
      idle: {
        on: {
          SELECT_ITEM: { target: 'vending', cond: 'sufficientDeposit' },
          DEPOSIT_QUARTER: { actions: ['addQuarter'] },
        },
      },
      vending: {},
    },
  },
  {
    actions: {
      addQuarter: assign({
        deposited: (context, event) => context.deposited + 25,
      }),
    },
    guards: {
      sufficientDeposit: (context, event) => context.deposited >= 100,
    },
  }
);
