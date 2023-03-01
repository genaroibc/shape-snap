import { TwitterCard } from './cards/TwitterCard';
import { LinkedinCard } from './cards/LinkedinCard';
import { PinterestCard } from './cards/PinterestCard';
import { TwitchCard } from './cards/TwitchCard';
import { TransformedImages } from '../types';

type Props = {
  cards: TransformedImages[];
};

export function PlatformCards({ cards }: Props) {
  return (
    <div>
      <div className="flex flex-col gap-20 md:p-4">
        {cards.map(({ banners, id, platformName }) => (
          <div key={id} className="flex flex-col justify-center items-center gap-12 md:p-4 text-center rounded">
            <h3 className="text-4xl text-blue-500">{platformName}</h3>
            {platformName === 'linkedin' ? (
              <LinkedinCard {...{ ...banners[0], id }} />
            ) : platformName === 'twitter' ? (
              <TwitterCard {...{ ...banners[0], id }} />
            ) : platformName === 'pinterest' ? (
              <PinterestCard {...{ ...banners[0], id }} />
            ) : platformName === 'twitch' ? (
              <TwitchCard {...{ ...banners[0], id }} />
            ) : (
              <p>Nothing to render</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
