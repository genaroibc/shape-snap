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
    <div className="flex flex-col gap-20 md:p-4">
      <h4 className="text-center text-5xl">Banners Preview</h4>

      {cards.map(({ banner, id, platformName }) => (
        <div
          key={id}
          className="bg-[#fafafa] md:pt-8 md:pb-16 flex flex-col justify-center items-center gap-4 md:p-4 text-center rounded"
        >
          <h5 className="text-4xl font-bold">{platformName?.toUpperCase()}</h5>
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
  );
}
