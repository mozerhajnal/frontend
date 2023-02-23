import { Carousel } from 'react-bootstrap';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';

export default function ControlledCarousel({ imgUrl }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant="light">
      {imgUrl &&
        imgUrl.map((image) => {
          return (
            <Carousel.Item key={nanoid()}>
              <img className="d-block w-100" src={image} alt="First slide" />
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}
