import React from 'react';
import { ButtonLoadMore } from '../ButtonLoadMore/ButtonLoadMore';
import { fetchImages } from '../api/FetchImage';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';

export class App extends React.Component {
  state = {
    searchQuery: '',
    page: 1,
    showBtn: false,
    images: [],
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        await fetchImages(searchQuery, page).then(images => {
          if (!images.hits.length) {
            this.setState({ status: 'rejected' });
            return;
          }
          this.setState(prevState => ({
            images:
              page !== 1
                ? [...prevState.images, ...images.hits]
                : [...images.hits],
            showBtn:
              images.hits.length !== 0 && page < Math.ceil(images.total / 12),
            status: 'resolved',
          }));
        });
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return;
      }
    }
  }

  handleSubmitQuery = query => {
    this.setState({ searchQuery: query, page: 1 });
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status, images, showBtn } = this.state;

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

        <ImageGallery status={status} images={images} />

        {showBtn && (
          <ButtonLoadMore status={status} onClick={this.handleLoadMoreBtn} />
        )}

        <ToastContainer />
      </AppStyle>
    );
  }
}
