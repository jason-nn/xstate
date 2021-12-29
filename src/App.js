import React from 'react';
import { useMachine } from '@xstate/react';

import promiseMachine from './machines/promiseMachine';

export default function App() {
  const [state, send] = useMachine(promiseMachine);

  return (
    <div>
      <h1>App.js</h1>

      {state.matches('pending') && <p>Loading...</p>}
      {state.matches('rejected') && <p>Promise Rejected</p>}
      {state.matches('resolved') && <p>Promise Resolved</p>}

      <button onClick={() => send('RESOLVE')}>Resolve</button>
      <button onClick={() => send('REJECT')}>Reject</button>
    </div>
  );
}
