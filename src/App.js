import React from 'react';
import Header from './components/header/Header';
import InputArea from './components/main/InputArea';
import Footer from './components/footer/Footer';
import './stylesheets/styles.scss';

function App() {
  return (
    <div className='App'>
      <Header />
      <InputArea />
      <Footer />
    </div>
  );
}

export default App;
