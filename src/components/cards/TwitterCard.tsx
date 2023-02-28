import { TransformedImageBanner } from '../../types';

export type Props = TransformedImageBanner;

export function TwitterCard({ name, url, height, width }: Props) {
  return (
    <>
      <article className="w-full flex flex-col gap-4 pb-12 border-[1px] border-gray-200">
        <figure className="flex flex-col gap-4 bg-white relative">
          <img
            className="object-cover aspect-square w-1/5 rounded-full absolute left-12 bottom-0 translate-y-1/2 border-[5px] border-white"
            src={url}
            alt="Twitter avatar"
            title="Twitter avatar"
          />
          <img
            className="object-cover"
            src={url}
            alt={`Twitter banner in ${name} resolution`}
            title={`Twitter banner in ${name} resolution`}
          />
        </figure>

        <nav className="flex w-full justify-end gap-4 px-6 [&>*]:border-2">
          <svg className="rounded-full w-12 p-2" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </g>
          </svg>
          <svg className="rounded-full w-12 p-2" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
            </g>
          </svg>
          <svg className="rounded-full w-12 p-2" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3zm-.86 13h-4.241c-.464 2.281-2.482 4-4.899 4s-4.435-1.719-4.899-4H2.87L4 9.05C4.51 5.02 7.93 2 12 2v2C8.94 4 6.36 6.27 5.98 9.3L5.13 16h13.73l-.38-3h2.02l.64 5zm-6.323 0H9.183c.412 1.164 1.51 2 2.817 2s2.405-.836 2.817-2z"></path>
            </g>
          </svg>

          <span className="w-fit rounded-full grid place-content-center px-4 font-medium text-lg">Following</span>
        </nav>
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
