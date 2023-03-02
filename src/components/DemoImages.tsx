import { v4 as uuid } from 'uuid';

const DEMO_IMAGES_LIST = [
  {
    src: '/assets/demo-images/sunrise.jpg',
    alt: 'A man in the street looking at his back',
    id: uuid()
  },
  {
    src: '/assets/demo-images/man-city-street.jpg',
    alt: 'A bird flying in sunrise sky',
    id: uuid()
  }
];

type Props = {
  onSelect: (e: React.MouseEvent) => void;
};

export function DemoImages({ onSelect }: Props) {
  return (
    <nav className="flex flex-wrap justify-center gap-4">
      {DEMO_IMAGES_LIST.map(({ alt, src, id }) => (
        <button key={id} className="p-0 m-0 w-36 max-w-[150px] rounded" onClick={onSelect}>
          <img
            className="w-full h-full brightness-75 hover:brightness-100 transition-[filter] duration-200"
            src={src}
            alt={alt}
          />
        </button>
      ))}
    </nav>
  );
}
