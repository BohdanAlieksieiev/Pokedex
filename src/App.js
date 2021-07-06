import RouterJS from './router/router'
import 'antd/dist/antd.css';
import './common/scss/app.scss'
import { Provider } from 'react-redux'
import { store } from "./store/Store";

function App() {
  return (
      <Provider store={store}>
        <RouterJS/>
      </Provider>
  );
}

export default App;
 