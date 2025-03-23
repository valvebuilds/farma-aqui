import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

const IMAGES = {
    HOME: require('./assets/home.png'),
    CANASTA: require('./assets/canasta.png'),
    CALENDARIO: require('./assets/calendario.png'),
    PERFIL: require('./assets/user.png')
};

export default IMAGES;