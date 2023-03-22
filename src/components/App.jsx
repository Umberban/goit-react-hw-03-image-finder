import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchPhotos } from 'service/api';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
import {Loader} from './Loader/Loader';
import {Modal} from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    photos: [],
    page: 1,
    isLoading: false,
    modalImage: '',
    showModal: false,
    totalHits: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ isLoading: true, photos: []  });
    }
    if (prevState.searchQuery !== this.state.searchQuery ||
        prevState.page !== this.state.page) {
      this.setState({ isLoading: true});
      
      this.getPhotos();
    }
  }

  async getPhotos() {
    const { searchQuery, page} = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await fetchPhotos(searchQuery, page);
      const arrayPhotos =  () =>
      response.data.hits.map(({ id, webformatURL: image, largeImageURL: modalImage }) => ({
       id,
       image,
       modalImage,
     }));

    //  console.log(response.data.totalHits)
      this.setState(prevState => ({
        photos: [...prevState.photos, ...arrayPhotos()],
      }));

      this.setState({ totalHits: response.data.totalHits })

      
    
      if (!response.data.hits.length) {
        return Promise.reject(
          new Error(
            toast.error(
              'There is no images'
            )
          )
        );
      } else if ( page=== 1) {
        toast.success(`There is some images`);
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.setState({page: 1})
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = data => {
    this.setState({ modalImage: data, showModal: true });
  };

  closeModal = () => {
    this.setState({ modalImage: null, showModal: false });
  };

  render() {
    const { photos, isLoading, showModal, modalImage, totalHits} = this.state;

    return (
      <>
        <Searchbar onSubmitForm={this.handleFormSubmit} />
        <ImageGallery photos={photos} openModal={this.openModal} />
        {showModal && <Modal image={modalImage} closeModal={this.closeModal} />}
        {isLoading && <Loader />}
        {<Button handleClick={this.loadMore} totalHits={totalHits} photos={photos.length} />}
        <ToastContainer autoClose={1488} />
      </>
    );
  }
}