import './App.css';
import Header from './my-components/Header';
import Navbar from './my-components/Navbar';
import Content from './my-components/Content';

const user = {
  username: "Farhana",
  userType: "tenant",
  userActive: true,
};

const page = "Tenants";

function App() {
  return (
    <>
      <Header username={user.username} userActive={user.userActive}/>
      <div className='app-grid-container'>
        <Navbar userType={user.userType} page={page}/>
        <Content/>
      </div>
    </>
  );
}

export default App;