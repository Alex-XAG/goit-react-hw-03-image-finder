import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import {
  SearchFormButton,
  SearchFormInput,
  SearchForm,
  SearchBarHeader,
} from './SearchBar.styled';

export class SearchBar extends React.Component {
  state = {
    searchQuery: '',
  };

  handleInput = ({ target }) => {
    this.setState({ searchQuery: target.value });
  };

  handleSubmitQuery = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error('Input search query please!!!', {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };
  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <SearchBarHeader>
        <SearchForm onSubmit={this.handleSubmitQuery}>
          <SearchFormButton type="submit">
            <AiOutlineSearch />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleInput}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
