import { DEMO_IMAGES_LIST } from '../constants';

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
