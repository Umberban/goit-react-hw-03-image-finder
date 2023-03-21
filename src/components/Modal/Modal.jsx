import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  closeWithEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeWithEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeWithEsc);
  }

  render() {
    const { image } = this.props;

    return (
      <div className={css.Overlay} onClick={this.handleBackdrop}>
        <div className={css.Modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}


Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};