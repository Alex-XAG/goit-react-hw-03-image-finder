import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

export class ImageGallery extends React.Component {
  render() {
    const { images } = this.props;

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
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.array.isRequired,
};
