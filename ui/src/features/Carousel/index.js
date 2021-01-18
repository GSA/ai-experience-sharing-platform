import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import Link from 'features/Link';

export const Carousel = ({
  className,
  fullWidth,
  images,
  ...props
}) => {

  return (
    <ReactCarousel showArrows={false} showThumbs={false} showStatus={false}>
      {images && images.length && images.map((image, i) => {
        return (
          <div key={image.text + image.imageUrl + image.linkUrl}>
            <Link url={image.linkUrl || '#'}>
              <img src={image.imageUrl} alt={image.text} />p
            </Link>
          </div>
               );
      })}
    </ReactCarousel>
  );
};

export default Carousel;
