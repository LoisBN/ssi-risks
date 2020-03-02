import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

const Home = () => {
  return (
    <div>
      <Header
        page={{
          title: "Niveau d'exigence ssi",
          subtitle: 'Version de developpement'
        }}
      />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
