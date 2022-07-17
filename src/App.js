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

const page = "register";

function App() {
  // let content_vars;

  // switch(page.toLowerCase()) {
  //   case "committee members":
  //     content_vars = committeemembers;
  //     break;
  //   case "tenants":
  //     content_vars = tenants;
  //     break;
  //   case "owners":
  //     content_vars = owners;
  //     break;
  //   default:
  //     content_vars = null;
  // }

  return (
    <>
      <Header username={user.username} userActive={user.userActive}/>
      {user.userActive
        ? 
        <div className='app-grid-container'>
          <Navbar userType={user.userType} page={page}/>
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