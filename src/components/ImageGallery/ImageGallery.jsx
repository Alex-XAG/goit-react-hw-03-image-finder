import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ButtonLoadMore } from '../ButtonLoadMore/ButtonLoadMore';
import { fetchImages } from '../api/FetchImage';
import { toast } from 'react-toastify';
import { ImageList } from './ImageGallery.styled';
import { InfinitySpin } from 'react-loader-spinner';

export class ImageGallery extends React.Component {
  state = {
    images: [],
    status: 'idle',

    showBtn: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.props;

    if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
      // console.log('changes');
      // console.log(prevProps.searchQuery);
      // console.log(searchQuery);

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

  render() {
    const { images, status, showBtn } = this.state;
    const { handleLoadMoreBtn } = this.props;

    // const showLoadMoreBtn = images.length !== 0;

    if (status === 'idle') {
      return <h2>Insert query!!!</h2>;
    }
    if (status === 'pending') {
      return <InfinitySpin width="200" color="#4fa94d" />;
    }
    if (status === 'rejected') {
      return (
        <h3>Your query did't give any results, please, try other request!!!</h3>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageList>
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ImageList>
          {showBtn && (
            <ButtonLoadMore status={status} onClick={handleLoadMoreBtn} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
