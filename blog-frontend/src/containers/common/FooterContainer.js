import React, { Component } from 'react';
import Footer from 'components/common/Footer';
import * as baseActions from 'store/modules/base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FooterContainer extends Component {
  handleLoginClick = async () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('login');
  }

  render() {
    const { handleLoginClick } = this;
    return (
      <Footer onLoginClick={handleLoginClick}/>
    );
  }
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(FooterContainer);