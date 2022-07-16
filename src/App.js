import './App.css';
import Header from './my-components/Header';
import Navbar from './my-components/Navbar';
import Content from './my-components/Content';


function App() {
  return (
    <>
      <Header username="Farhana" userActive={true}/>
      {/* <Header/> */}
      <div className='app-grid-container'>
        <Navbar/>
        <Content/>
      </div>
    </>
    
  );
}

export default App;