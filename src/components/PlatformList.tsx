import { PLATFORM_ITEMS } from '../constants/social-platforms';

type Props = {
  onSelectionChange: (e: React.ChangeEvent) => void;
  selectedPlatforms: string[];
};

export function PlatformList({ onSelectionChange, selectedPlatforms }: Props) {
  return (
    <section>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-8 p-8 mx-auto">
        {PLATFORM_ITEMS.map(({ iconSrc, name }) => (
          <li title={name} key={name}>
            <input
              onChange={onSelectionChange}
              className="hidden [&:checked+label]:bg-white [&:checked+label]:shadow-2xl [&:checked+label_img]:brightness-100"
              type="checkbox"
              name={name}
              id={name}
              defaultChecked={selectedPlatforms.includes(name)}
              hidden
            />
            <label
              className="shadow-lg text-center bg-gray-100 rounded-3xl w-full aspect-square grid place-content-center p-4 gap-4 group transition-colors"
              htmlFor={name}
            >
              <img
                className="w-2/6 mx-auto transition-filter duration-150 brightness-0 group-hover:brightness-100"
                src={iconSrc}
                alt={name}
              />
              <span>{name}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
