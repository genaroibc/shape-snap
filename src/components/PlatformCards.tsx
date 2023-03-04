import { TwitterCard } from './cards/TwitterCard';
import { LinkedinCard } from './cards/LinkedinCard';
import { PinterestCard } from './cards/PinterestCard';
import { TwitchCard } from './cards/TwitchCard';
import { TransformedImage } from '../types';
import { YouTubeCard } from './cards/YouTubeCard';

type Props = {
  cards: TransformedImage[];
};

export function PlatformCards({ cards }: Props) {
  return (
    <div>
      <div className="flex flex-col gap-20 md:p-4">
        {cards.map(({ banner, id, platformName }) => (
          <div key={id} className="flex flex-col justify-center items-center gap-12 md:p-4 text-center rounded">
            <h3 className="text-4xl text-blue-500">{platformName}</h3>
            {platformName === 'linkedin' ? (
              <LinkedinCard {...{ ...banner, id }} />
            ) : platformName === 'twitter' ? (
              <TwitterCard {...{ ...banner, id }} />
            ) : platformName === 'pinterest' ? (
              <PinterestCard {...{ ...banner, id }} />
            ) : platformName === 'twitch' ? (
              <TwitchCard {...{ ...banner, id }} />
            ) : platformName === 'youtube' ? (
              <YouTubeCard {...{ ...banner, id }} />
            ) : (
              <p>Nothing to render</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
