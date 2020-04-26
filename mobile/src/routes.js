import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Dashboard,
  })
);
