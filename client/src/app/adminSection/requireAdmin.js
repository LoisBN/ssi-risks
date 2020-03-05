import React, { useEffect } from 'react';
import history from '../history';
import { connect } from 'react-redux';

function requireAdmin(ChildComponent) {
  const RequireAdmin = props => {
    setTimeout(() => {
      if (!props.auth.admin) history.push('/');
    }, 500);

    return <ChildComponent />;
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  return connect(mapStateToProps)(RequireAdmin);
}

export default requireAdmin;
