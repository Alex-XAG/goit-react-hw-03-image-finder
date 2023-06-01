import React from 'react';
import { SearchBar } from './Searchbar/Searchbar';

export class App extends React.Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  render() {
    const { searchQuery, page } = this.state;

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchBar page={page} searchQuery={searchQuery} />
      </div>
    );
  }
}
