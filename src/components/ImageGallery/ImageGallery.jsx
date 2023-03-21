import React from 'react';
import css from './ImageGallery.module.css';
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';


export const ImageGallery = ({photos, openModal}) => {
  return (
    <ul className={css.ImageGallery}>
    <ImageGalleryItem  photos={photos} openModal={openModal}/>
    </ul>

  )
}


ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
}