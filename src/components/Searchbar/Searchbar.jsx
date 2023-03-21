import React, {Component} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {

 state = {
  searchQuery: '',
 }


 handleSearchChange = e => {
  this.setState({searchQuery: e.currentTarget.value.toLowerCase()});

 };

 handleSearchSubmit = e => {
  e.preventDefault();
  if(this.state.searchQuery.trim() === '' ) {
  return toast.info("You need to enter some text first")
  }
  this.props.onSubmitForm(this.state.searchQuery);
  this.setState({searchQuery: ''});
 };

render () {
  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSearchSubmit}>
          <button type="submit" className={css.SearchFormbutton}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>
          <input
            className={css.SearchForm_input}
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}
};

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};