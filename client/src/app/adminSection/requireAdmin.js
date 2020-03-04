import React, { useEffect } from 'react';
import history from '../history';
import { connect } from 'react-redux';

function requireAdmin(ChildComponent) {
  const RequireAdmin = props => {
    useEffect(() => {
      setTimeout(() => {
        if (!props.auth.admin) {
          history.push('/');
        }
      }, 0);
    }, [props.auth.admin]);

    return <ChildComponent />;
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  return connect(mapStateToProps)(RequireAdmin);
}

export default requireAdmin;
