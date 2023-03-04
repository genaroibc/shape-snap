import { TransformedImageBanner } from '../../types';
import { CardLayout } from './CardLayout';

type Props = TransformedImageBanner;

export function PinterestCard({ url, height, width }: Props) {
  return (
    <CardLayout {...{ height, width }}>
      <figure className="flex flex-col gap-4 bg-white relative">
        <img
          className="object-cover aspect-square w-1/5 rounded-full absolute left-1/2 bottom-0 translate-y-[60%] -translate-x-1/2 border-[3px] border-white"
          src={url}
          alt="Pinterest avatar"
          title="Pinterest avatar"
        />
        <img className="object-cover rounded-[3.5rem]" src={url} alt={`Pinterest banner`} title={`Pinterest banner`} />
      </figure>

      <span className="font-bold text-black mt-16 sm:mt-28 md:mt-28 text-3xl md:text-3xl flex gap-4 items-center justify-center">
        Pinterest
        <svg className="w-8" fill="#cc0000" viewBox="0 0 24 24" aria-label="Badge icon" role="img">
          <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.56 10.06-6 6a1.5 1.5 0 0 1-2.12 0l-3-3a1.5 1.5 0 0 1 0-2.12 1.5 1.5 0 0 1 2.12 0l1.94 1.94 4.94-4.94a1.5 1.5 0 0 1 2.12 0 1.5 1.5 0 0 1 0 2.12z"></path>
        </svg>
      </span>
    </CardLayout>
  );
}
