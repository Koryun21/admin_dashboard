import React from 'react';
import { Provider } from 'react-redux';

import { MyOrganization } from '@/pages/MyOrganization/MyOrganization';

import { store } from './model/store';

import './index.css';

function App() {
  return (
    <Provider store={store}>
      <MyOrganization />
    </Provider>
  );
}

export default App;
