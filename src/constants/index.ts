import { v4 as uuid } from 'uuid';

export const STEP_LIST = ['Upload your image', 'Select platforms', 'Generate images'];

export const TOTAL_STEPS = STEP_LIST.length;

export const DEMO_IMAGES_LIST = [
  {
    src: '/assets/demo-images/butterfly.webp',
    alt: 'A butterfly pollinating a flower',
    id: uuid()
  },
  {
    src: '/assets/demo-images/woman.webp',
    alt: 'A woman in a fall forest looking at the camera',
    id: uuid()
  },

  {
    src: '/assets/demo-images/sunset.webp',
    alt: 'A sunset at sea',
    id: uuid()
  },
  {
    src: '/assets/demo-images/girl.webp',
    alt: 'A girl with fireworks behind her',
    id: uuid()
  },
  {
    src: '/assets/demo-images/mountain.webp',
    alt: 'A ',
    id: uuid()
  }
];
