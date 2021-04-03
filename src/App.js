
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import { useDispatch,useSelector } from "react-redux";
import Header from './components/Header/Header'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

import VerifyMailScreen from './screens/VerifyMailScreen';
import ActivateAccountScreen from './screens/ActivateAccountScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import CompletedTodosScreen from './screens/CompletedTodosScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

function App() {
  // const userInfo = useSelector(state => state.userInfo);

  // const {loading, error, userData, userStatus } = userInfo;

  // const token = userData ? userData.token : null;
  return (
    <>
      <BrowserRouter>
          <Header />
          <main>
              <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/verify-mail" component={VerifyMailScreen} />
              <Route path="/verify-account/:userId/:secretCode" component={ActivateAccountScreen} />
              <Route path="/forget-password" component={ForgetPasswordScreen} />
              <Route path="/userhome" component={UserHomeScreen} />
              <Route path="/completed-todos" component={CompletedTodosScreen} />
              <Route path="/reset-password" component={ResetPasswordScreen} />
            </Switch>
          </main>
      </BrowserRouter>
    </>
  );
}

export default App;
