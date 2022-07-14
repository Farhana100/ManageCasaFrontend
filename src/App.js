import './App.css';
import Header from './my-components/Header';
import Navbar from './my-components/Navbar';
import Content from './my-components/Content';

function App() {
  return (
    <>
      <Header username="Farhana"/>
      <div className='grid-container'>
        <Navbar/>
        <Content/>
      </div>
    </>
  );
}

export default App;