import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ photos, openModal }) => {
  return (
    <>
      {photos.map(({ id, image, modalImage }) => (
        <li className={css.ImageGalleryItem} key={id}>
          <img
            className={css.ImageGalleryItem_image}
            src={image}
            alt=""
            onClick={() => openModal(modalImage)}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  photos: PropTypes.array,
  openModal: PropTypes.func,
};