import { assign, createMachine, interpret } from 'xstate';

const tryAgainMachine = createMachine(
  {
    id: 'tryAgain',
    initial: 'idle',
    context: {
      tries: 0,
    },
    states: {
      idle: {
        on: {
          TRY: { target: 'trying' },
        },
      },
      trying: {
        entry: ['addTry', 'sendContext'],
        always: [
          { target: 'success', cond: 'enoughTries' },
          { target: 'idle' },
        ],
      },
      success: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      addTry: assign({
        tries: (context, event) => context.tries + 1,
      }),
      sendContext: (context, event) => {
        console.log('context: ', context);
      },
    },
    guards: {
      enoughTries: (context, event) => context.tries > 2,
    },
  }
);

const tryAgainService = interpret(tryAgainMachine).onTransition((state) =>
  console.log(state.value)
);

tryAgainService.start();

// tryAgainService.send({ type: 'TRY' });

// tryAgainService.send({ type: 'TRY' });

// tryAgainService.send({ type: 'TRY' });
