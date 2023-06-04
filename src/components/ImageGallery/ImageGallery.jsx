import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ButtonLoadMore } from '../ButtonLoadMore/ButtonLoadMore';
import { fetchImages } from '../api/FetchImage';
import { toast } from 'react-toastify';
import { ImageList } from './ImageGallery.styled';

export class ImageGallery extends React.Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevProps.searchQuery !== searchQuery) {
      // console.log('changes');
      // console.log(prevProps.searchQuery);
      // console.log(searchQuery);

      this.setState({ status: 'pending' });
      try {
        await fetchImages(searchQuery, page).then(images => {
          if (images.hits.length > 1) {
            this.setState({ images: images.hits, status: 'resolved' });
            return;
          }
          this.setState({ status: 'rejected' });
        });
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return;
      }
    }
  }

  handleLoadMoreBtn = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }));
    const { page } = this.state;
    const { searchQuery } = this.props;
    try {
      const getImages = await fetchImages(searchQuery, page).then(
        resArr => resArr.hits
      );
      console.log(getImages);
      this.setState(prevState => ({
        images: [...prevState.images, ...getImages],
      }));
    } catch (error) {
      throw new Error("Can't find searching images ((( ");
    }
  };

  render() {
    const { images, status } = this.state;

    const showLoadMoreBtn = images.length !== 0;

    if (status === 'idle') {
      return <h2>Insert query!!!</h2>;
    }
    if (status === 'pending') {
      return <h3>Loading...</h3>;
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
          {showLoadMoreBtn && (
            <ButtonLoadMore status={status} onClick={this.handleLoadMoreBtn} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
