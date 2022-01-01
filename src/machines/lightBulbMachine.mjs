import { createMachine, interpret } from 'xstate';

const lightBulbMachine = createMachine(
  {
    id: 'lightBulb',
    initial: 'unlit',
    states: {
      unlit: {
        on: {
          // BREAK: { target: 'broken', actions: ['sendBrokenMessage'] },
          BREAK: { target: 'broken' },
          TOGGLE: { target: 'lit' },
        },
      },
      lit: {
        on: {
          // BREAK: { target: 'broken', actions: ['sendBrokenMessage'] },
          BREAK: { target: 'broken' },
          TOGGLE: { target: 'unlit' },
          NOTHING: { target: 'lit', internal: true },
        },
        exit: ['sendLightOffMessage'],
      },
      broken: {
        type: 'final',
        entry: ['sendBrokenMessage'],
      },
    },
    strict: true,
  },
  {
    actions: {
      sendBrokenMessage: (context, event) => {
        console.log(`the light in the ${event.location} is broken`);
      },
      sendLightOffMessage: (context, event) => {
        console.log(`the room is now dark and cold`);
      },
    },
  }
);

// export default lightBulbMachine;

// console.log(lightBulbMachine.initialState.value);
// // => 'unlit'

// console.log(lightBulbMachine.transition('unlit', 'BREAK').value);
// // => 'broken'

const lightBulbService = interpret(lightBulbMachine).onTransition((state) =>
  console.log(state.value)
);

lightBulbService.start();
// => 'unlit'

// lightBulbService.send({ type: 'TOGGLE' });
// => 'lit'

// lightBulbService.send({ type: 'NOTHING' });
// => 'lit'

// lightBulbService.send({ type: 'TOGGLE' });
// // => 'unlit'

// lightBulbService.send({ type: 'BREAK', location: 'living room' });
// => 'broken'
