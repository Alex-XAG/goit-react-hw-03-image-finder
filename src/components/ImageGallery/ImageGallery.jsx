import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { fetchImages } from '../api/FetchImage';
import { toast } from 'react-toastify';

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
      return (
        <li>
          <h2>Insert query!!!</h2>
        </li>
      );
    }
    if (status === 'pending') {
      return (
        <li>
          <h3>Loading...</h3>
        </li>
      );
    }
    if (status === 'rejected') {
      return (
        <li>
          <h3>
            Your query did't give any results, please, try other request!!!
          </h3>
        </li>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ul>
          {showLoadMoreBtn && <Button onClick={this.handleLoadMoreBtn} />}
        </>
      );
    }
  }
}
