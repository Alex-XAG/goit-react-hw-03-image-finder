import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from '../Searchbar/Searchbar';
import { fetchImages } from '../api/FetchImage';
// import debounce from 'lodash.debounce';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';

export class App extends React.Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleSubmitQuery = query => {
    this.setState({ searchQuery: query, page: 1 });
  };

  getTotalPages = async () => {
    const { per_page, page, searchQuery } = this.state;
    const getImages = await fetchImages(searchQuery, page).then(
      resArr => resArr.totalHits
    );
    const totalPages = Math.ceil(getImages / per_page);
    this.setState({ totalPages: totalPages });
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchQuery, page } = this.state;

    return (
      <AppStyle
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchBar onSubmit={this.handleSubmitQuery} />

        <ImageGallery
          page={page}
          handleLoadMoreBtn={this.handleLoadMoreBtn}
          toggleModal={this.toggleModal}
          searchQuery={searchQuery}
        />

        <ToastContainer />
      </AppStyle>
    );
  }
}
