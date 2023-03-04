import { TransformedImageBanner } from '../../types';
import { CardLayout } from './CardLayout';

type Props = TransformedImageBanner;

export function LinkedinCard({ url, height, width }: Props) {
  return (
    <CardLayout {...{ height, width }}>
      <figure className="flex flex-col gap-4 mb-24 bg-white relative">
        <img
          className="object-cover aspect-square w-[22%] rounded-full absolute right-[72%] bottom-0 translate-y-1/3 border-[2px] md:border-[6px] border-white"
          src={url}
          alt="LinkedIn avatar"
          title="LinkedIn avatar"
        />
        <img className="rounded-tl-xl rounded-tr-xl" src={url} alt={`LinkedIn banner`} title={`LinkedIn banner`} />
      </figure>
      <div className="grid grid-cols-2 gap-4 text-left max-w-[80%] ml-16">
        <div className="flex flex-col gap-4">
          <span className="text-4xl font-semibold">LinkedIn Profile</span>
          <span className="text-2xl font-normal">LinkedIn profile description</span>
        </div>
        <div className="flex items-end flex-col gap-4">
          <div className="flex gap-4 items-center w-1/2">
            <img src="/assets/logo/favicon.ico" alt="" width="40" height="40" />
            <span className="font-semibold">Portfolio</span>
          </div>
          <div className="flex gap-4 items-center w-1/2">
            <img src="/assets/logo/favicon.ico" alt="" width="40" height="40" />
            <span className="font-semibold">School</span>
          </div>
        </div>
      </div>
    </CardLayout>
  );
}
