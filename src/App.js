import React from 'react';
import { useGlobalContext } from './context';
import CartContainer from './CartContainer';
import Navbar from './Navbar';

function App() {
  const { loading } = useGlobalContext()

  if(loading){
    return(
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <Navbar/>
      <CartContainer/>
    </main>
  );
}

export default App;
