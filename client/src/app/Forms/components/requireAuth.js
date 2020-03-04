import React, { useEffect } from 'react';
import history from '../../history';
import { connect } from 'react-redux';

function requireAuth(ChildComponent) {
  const RequireAuthComponent = props => {
    if (!props.authenticated) {
      return '';
    } else {
      return <ChildComponent />;
    }
  };
  return RequireAuthComponent;
}

const mapsStateToProps = state => ({
  auth: state.auth
});

export default connect(requireAuth);
