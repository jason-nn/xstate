import { assign, createMachine } from 'xstate';
import fetch from 'node-fetch';

const fetchCuteAnimals = () => {
  return fetch('https://thatcopy.pw/catapi/rest/').then((res) => res.json());
};

const cuteAnimalsMachine = createMachine({
  id: 'cuteAnimals',
  initial: 'idle',
  context: {
    cuteAnimals: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      },
    },
    loading: {
      invoke: {
        id: 'fetchCuteAnimals',
        src: fetchCuteAnimals,
        onDone: {
          target: 'success',
          actions: [
            assign({
              cuteAnimals: (context, event) => event.data,
            }),
          ],
        },
        onError: {
          target: 'failure',
          actions: [
            assign({
              error: (context, event) => event.data,
            }),
          ],
        },
      },
    },
    success: {
      type: 'final',
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
  },
});
