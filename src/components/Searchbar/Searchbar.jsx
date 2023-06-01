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

  render() {
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={onSubmit}>
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
  handleChangeQuery: PropTypes.func.isRequired,
};
