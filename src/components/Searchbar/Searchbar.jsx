import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

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
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmitQuery}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
