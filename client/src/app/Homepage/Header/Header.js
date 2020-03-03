import React from 'react';
import Auth from './components/Auth';

const Header = props => {
  return (
    <section className='hero is-dark is-bold'>
      <div className='hero-body'>
        <div className='container'>
          <Auth />
          <h1 className='title'>{props.page.title}</h1>
          <h2 className='subtitle'>{props.page.subtitle}</h2>
        </div>
      </div>
    </section>
  );
};

export default Header;
