import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { GalleryItem, GalleryLargeImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { image } = this.props;
    const { showModal } = this.state;
    return (
      <GalleryItem className="gallery-item">
        <img
          src={image.webformatURL}
          alt={image.tags}
          width="380"
          height="240"
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal handleCloseModal={this.toggleModal}>
            <GalleryLargeImage src={image.largeImageURL} alt={image.tags} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
