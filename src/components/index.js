import telaInicial from './telaInicial';
import cadastroUsuario from './cadastroUsuario';

import { createStackNavigator } from 'react-navigation';

const StackNavigator = createStackNavigator({
  Inicial: telaInicial,
  Usuario: cadastroUsuario,
});

export default { StackNavigator };