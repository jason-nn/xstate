import { createMachine, interpret } from 'xstate';

const lightBulbMachine = createMachine({
  id: 'lightBulb',
  initial: 'unlit',
  states: {
    unlit: {
      on: {
        BREAK: { target: 'broken' },
        TOGGLE: { target: 'lit' },
      },
    },
    lit: {
      on: {
        BREAK: { target: 'broken' },
        TOGGLE: { target: 'unlit' },
      },
    },
    broken: {
      type: 'final',
    },
  },
  strict: true,
});

// export default lightBulbMachine;

// console.log(lightBulbMachine.initialState.value);
// // => 'unlit'

// console.log(lightBulbMachine.transition('unlit', 'BREAK').value);
// // => 'broken'

// const lightBulbService = interpret(lightBulbMachine).onTransition((state) =>
//   console.log(state.value)
// );

// lightBulbService.start();
// // => 'unlit'

// lightBulbService.send({ type: 'TOGGLE' });
// // => 'lit'

// lightBulbService.send({ type: 'BREAK' });
// // => 'broken'
