import { TransformedImageBanner } from '../../types';
import { CardLayout } from './CardLayout';

type Props = TransformedImageBanner;

export function LinkedinCard({ url, height, width }: Props) {
  return (
    <CardLayout {...{ height, width }}>
      <figure className="flex flex-col gap-4 mb-16 bg-white relative">
        <img
          className="object-cover aspect-square w-[22%] rounded-full absolute right-[72%] bottom-0 translate-y-1/3 border-[2px] md:border-[6px] border-white"
          src={url}
          alt="LinkedIn avatar"
          title="LinkedIn avatar"
        />
        <img className="object-cover" src={url} alt={`LinkedIn banner`} title={`LinkedIn banner`} />
      </figure>
    </CardLayout>
  );
}
