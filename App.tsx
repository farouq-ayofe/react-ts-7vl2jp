import * as React from 'react';
import { useSliderFilter } from './useSliderFilter';

import './style.css';

export default function App() {
  useSliderFilter();
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
