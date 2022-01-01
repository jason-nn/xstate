import { assign, createMachine, interpret } from 'xstate';

const doubleCounterMachine = createMachine(
  {
    id: 'doubleCounter',
    initial: 'idle',
    context: {
      previousCount: undefined,
      count: 0,
    },
    states: {
      idle: {
        on: {
          INCREMENT_TWICE: {
            actions: [
              // assign actions are run before non assign actions (priority +1)
              // so in reality setPreviousCount and incrementCount are run
              // before the before log
              (context, event) => console.log('before:', context.previousCount),
              'setPreviousCount',
              'incrementCount',
              'incrementCount',
              (context, event) => console.log('after:', context.count),
              'sendContext',
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      incrementCount: assign({
        count: (context, event) => context.count + 1,
      }),
      setPreviousCount: assign({
        previousCount: (context, event) => context.count,
      }),
      sendContext: (context, event) => {
        console.log('context: ', context);
      },
    },
  }
);

const doubleCounterMachineService = interpret(doubleCounterMachine);

// doubleCounterMachineService.start();

// doubleCounterMachineService.send({ type: 'INCREMENT_TWICE' });
// => before: 0
// => after: 2
// => context:  { previousCount: 0, count: 2 }

// doubleCounterMachineService.send({ type: 'INCREMENT_TWICE' });
// => before: 2
// => after: 4
// => context:  { previousCount: 2, count: 4 }
