import React from 'react';
import PropTypes from 'prop-types';

export class SearchBar extends React.Component {
  state = {
    searchQuery: '',
  };

  handleInput = async ({ target }) => {
    await this.setState({ searchQuery: target.value });
    this.props.handleChangeQuery(this.state.searchQuery);
  };

  handleSubmitQuery = async e => {
    e.preventDefault();

    await this.props.onSubmit();
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
