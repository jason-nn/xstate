import { createMachine, interpret } from 'xstate';

const lightBulbMachine = createMachine({
  id: 'lightBulb',
  initial: 'unlit',
  states: {
    unlit: {
      on: {
        BREAK: 'broken',
        TOGGLE: 'lit',
      },
    },
    lit: {
      on: {
        BREAK: 'broken',
        TOGGLE: 'unlit',
      },
    },
    broken: {
      type: 'final',
    },
  },
  strict: true,
});

export default lightBulbMachine;

// console.log(lightBulbMachine.initialState.value);
// => 'unlit'

// console.log(lightBulbMachine.transition('unlit', 'BREAK').value);
// => 'broken'

// const lightBulbService = interpret(lightBulbMachine).onTransition((state) =>
//   console.log(state.value)
// );

// lightBulbService.start();

// lightBulbService.send('TOGGLE');
// lightBulbService.send('BREAK');
