import { v4 as uuid } from 'uuid';

export const STEP_LIST = ['Upload your image', 'Select platforms', 'Generate images'];

export const TOTAL_STEPS = STEP_LIST.length;

export const DEMO_IMAGES_LIST = [
  {
    src: '/assets/demo-images/sunrise.jpg',
    alt: 'A bird flying in sunrise sky',
    id: uuid()
  },
  {
    src: '/assets/demo-images/man-city-street.jpg',
    alt: 'A man in the street looking at his back',
    id: uuid()
  }
];
