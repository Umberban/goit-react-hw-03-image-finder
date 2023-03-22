import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({handleClick,totalHits,photos}) => {
  if(totalHits<=photos){
    return;
  }else{
  return (
    <button className={css.Button} type="button" onClick={handleClick}>Load more</button>
  )
}}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
}