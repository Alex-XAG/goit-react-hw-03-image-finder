import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';
import { InfinitySpin } from 'react-loader-spinner';

export class ImageGallery extends React.Component {
  render() {
    const { status, images } = this.props;

    const showGallery = images.length !== 0;

    if (showGallery) {
      return (
        <>
          <ImageList>
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ImageList>
        </>
      );
    }

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

    return (
      showGallery && (
        <>
          <ImageList>
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ImageList>
        </>
      )
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
