import './App.css';
import Header from './my-components/Header';
import Navbar from './my-components/Navbar';
import Content from './my-components/Content';
import Home from './my-components/Home';
import Login from './my-components/Login';
import Register from './my-components/Register';

const user = {
  username: "Farhana",
  userType: "admin",
  userActive: true,
};

const page = "owners";

function App() {
  return (
    <>
      <Header username={user.username} userActive={user.userActive}/>
      {user.userActive
        ? 
        <div className='app-grid-container'>
          <Navbar userType={user.userType}/>
          <div className='p-3'><Content /></div>
        </div>
        : 
        page.toLocaleLowerCase() === "login"
        ?
        <Login/>
        :
        page.toLocaleLowerCase() === "register"
        ?
        <Register/>
        :
        <Home/>
      }
    </>
  );
}

export default App;