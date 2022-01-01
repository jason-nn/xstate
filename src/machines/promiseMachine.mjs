import { createMachine, interpret } from 'xstate';

const promiseMachine = createMachine({
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {
      on: {
        RESOLVE: { target: 'resolved' },
        REJECT: { target: 'rejected' },
      },
    },
    resolved: {
      type: 'final',
    },
    rejected: {
      type: 'final',
    },
  },
});

export default promiseMachine;

// const promiseService = interpret(promiseMachine).onTransition((state) =>
//   console.log(state.value)
// );

// // Start the service
// promiseService.start();
// // => 'pending'

// promiseService.send({ type: 'RESOLVE' });
// // => 'resolved'
