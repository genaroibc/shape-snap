import { TransformedImageBanner } from '../../types';

export type Props = TransformedImageBanner;

export function LinkedinCard({ name, url, height, width }: Props) {
  return (
    <>
      <article className="w-full flex flex-col gap-4 pb-20 border-[1px] border-gray-200 overflow-hidden shadow-2xl">
        <figure className="flex flex-col gap-4 bg-white relative">
          <img
            className="object-cover aspect-square w-[22%] rounded-full absolute right-[72%] bottom-0 translate-y-1/3 border-[2px] md:border-[6px] border-white"
            src={url}
            alt="LinkedIn avatar"
            title="LinkedIn avatar"
          />
          <img
            className="object-cover"
            src={url}
            alt={`LinkedIn banner in ${name} resolution`}
            title={`LinkedIn banner in ${name} resolution`}
          />
        </figure>
      </article>
      <div className="flex gap-4 justify-center items-center">
        <h5 className="text-xl">{name.toUpperCase()}</h5>

        <figcaption className="text-gray-700">
          {width}x{height}
        </figcaption>
      </div>
    </>
  );
}
