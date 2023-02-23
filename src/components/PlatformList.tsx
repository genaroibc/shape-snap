const PLATFORM_LIST = [
  { name: 'twitch', iconSrc: '/assets/svg/twitch.svg' },
  { name: 'youtube', iconSrc: '/assets/svg/youtube.svg' },
  { name: 'tiktok', iconSrc: '/assets/svg/tiktok.svg' },
  { name: 'twitter', iconSrc: '/assets/svg/twitter.svg' }
];

type Props = {
  onSelectionChange: (e: React.ChangeEvent) => void;
};

export function PlatformList({ onSelectionChange }: Props) {
  return (
    <section>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 place-content-center mx-auto">
        {PLATFORM_LIST.map(({ iconSrc, name }) => (
          <li title={name} key={name}>
            <input
              onChange={onSelectionChange}
              className="hidden [&:checked+label]:bg-blue-300"
              type="checkbox"
              name={name}
              id={name}
            />
            <label
              className="shadow-xl rounded-3xl w-48 h-48 grid place-content-center p-4 gap-4 group transition-colors"
              htmlFor={name}
            >
              <img
                className="transition-filter duration-150 brightness-0 group-hover:brightness-100"
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
