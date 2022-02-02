import React from 'react';
import AppContainer from './src/components/app-container';
import Navigator from './src/';

import Main from './src/screens/main-screen';

export default function App() {
  return (
    <AppContainer>
      <Navigator />
    </AppContainer>
  );
}
