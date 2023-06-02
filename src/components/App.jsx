import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchImages } from './api/FetchImage';
// import debounce from 'lodash.debounce';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = {
    searchQuery: '',
    per_page: 12,

    totalPages: null,
  };

  // async componentDidMount() {
  //   this.handleFetchImages();
  //   this.getTotalPages();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (condition) {
  //   }
  // }

  handleSubmitQuery = query => {
    this.setState({ searchQuery: query, page: 1 });
  };

  // handleFetchImages = async () => {
  //   const { searchQuery, page } = this.state;
  //   try {
  //     const getImages = await fetchImages(searchQuery, page).then(
  //       resArr => resArr.hits
  //     );
  //     this.setState({ images: [...getImages] });
  //   } catch (error) {
  //     throw new Error("Can't find searching images ((( ");
  //   }
  // };

  getTotalPages = async () => {
    const { per_page, page, searchQuery } = this.state;
    const getImages = await fetchImages(searchQuery, page).then(
      resArr => resArr.totalHits
    );
    const totalPages = Math.ceil(getImages / per_page);
    this.setState({ totalPages: totalPages });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div
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

        <ImageGallery searchQuery={searchQuery} />

        <ToastContainer />
      </div>
    );
  }
}
