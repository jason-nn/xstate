import React from 'react';
import { useMachine } from '@xstate/react';

import promiseMachine from '../machines/promiseMachine';

export default function Promise() {
  const [state, send] = useMachine(promiseMachine);

  return (
    <div>
      <h2>Promise Machine</h2>

      {state.matches('pending') && <p>Loading...</p>}
      {state.matches('rejected') && <p>Promise Rejected</p>}
      {state.matches('resolved') && <p>Promise Resolved</p>}

      <button onClick={() => send('RESOLVE')}>Resolve</button>
      <button onClick={() => send('REJECT')}>Reject</button>
    </div>
  );
}
