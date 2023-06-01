import React from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchImages } from './api/FetchImage';
import debounce from 'lodash.debounce';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends React.Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
  };

  async componentDidMount() {
    const { searchQuery, page } = this.state;
    if (this.state.images.length === 0) {
      try {
        const getImages = await fetchImages(searchQuery, page).then(
          resArr => resArr.hits
        );
        this.setState({ images: [...getImages] });
      } catch (error) {
        throw new Error("Can't find searching images ((( ");
      }
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (condition) {
  //   }
  // }

  handleChangeQuery = debounce(query => {
    this.setState({ searchQuery: query });
  }, 500);

  handleSubmitQuery = async e => {
    e.preventDefault();
    const { searchQuery, page } = this.state;
    try {
      const getImages = await fetchImages(searchQuery, page).then(
        resArr => resArr.hits
      );
      this.setState({ images: [...getImages] });
    } catch (error) {
      throw new Error("Can't find searching images ((( ");
    }
  };

  handleFetchImages = async () => {};

  handleLoadMoreBtn = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }));
    const { searchQuery, page } = this.state;
    try {
      const getImages = await fetchImages(searchQuery, page).then(
        resArr => resArr.hits
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...getImages],
      }));
    } catch (error) {
      throw new Error("Can't find searching images ((( ");
    }
  };

  render() {
    const { page, images, per_page, searchQuery } = this.state;

    const getImages = fetchImages(searchQuery, page).then(
      resArr => resArr.hits
    );

    const showLoadMoreBtn = images.length !== 0;

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
        <SearchBar
          onSubmit={this.handleSubmitQuery}
          handleChangeQuery={this.handleChangeQuery}
        />
        <ImageGallery images={images} />

        {showLoadMoreBtn && <Button onClick={this.handleLoadMoreBtn} />}
      </div>
    );
  }
}
