import { TransformedImageBanner } from '../../types';
import { CardLayout } from './CardLayout';

type Props = TransformedImageBanner;

export function TwitchCard({ name, url, height, width }: Props) {
  return (
    <CardLayout {...{ height, width, name }}>
      <figure className="flex flex-col gap-4 bg-white">
        <img
          className="object-cover"
          src={url}
          alt={`Pinterest banner in ${name} resolution`}
          title={`Pinterest banner in ${name} resolution`}
        />
      </figure>

      <nav className="w-11/12 m-auto flex gap-4 items-center justify-between">
        <div className="flex justify-start items-center gap-4">
          <div className="relative inline w-2/12 border-[3px] border-black rounded-full">
            <img
              className="object-cover aspect-square w-full rounded-full border-[3px] border-white"
              src={url}
              alt="Pinterest avatar"
              title="Pinterest avatar"
            />
            <span className="absolute -bottom-2 px-2 border-[3px] left-1/2 -translate-x-1/2 border-white rounded text-white bg-[#eb0400] font-semibold">
              LIVE
            </span>
          </div>

          <div className="flex flex-col gap-2 justify-center leading-3">
            <span className="font-bold flex text-xl">
              Twitch
              <svg width="20px" height="20px" fill="#9147ff" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 2l6 2 2 6-2 6-6 2-6-2-2-6 2-6 6-2zM8.889 13.636l5.43-5.429-1.415-1.414-4.015 4.015-2.015-2.015-1.414 1.414 3.429 3.43z"
                ></path>
              </svg>
            </span>
            <span className="font-light">77.2k followers</span>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="bg-[#eee] p-2">
            <svg width="25px" height="25px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
              <g>
                <path
                  fillRule="evenodd"
                  d="M9.171 4.171A4 4 0 006.343 3H6a4 4 0 00-4 4v.343a4 4 0 001.172 2.829L10 17l6.828-6.828A4 4 0 0018 7.343V7a4 4 0 00-4-4h-.343a4 4 0 00-2.829 1.172L10 5l-.829-.829z"
                  clipRule="evenodd"
                ></path>
              </g>
            </svg>
          </div>

          <div className="bg-[#eee] p-2">
            <svg width="25px" height="25px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
              <g>
                <path d="M3 14v-2c1-.5 1.75-1 2-2 .095-.38.154-.905.221-1.506C5.51 5.936 5.951 2 10 2c4.05 0 4.491 3.936 4.779 6.494.067.601.126 1.126.221 1.506.25 1 1 1.5 2 2v2H3zM9.998 18a2 2 0 01-2-2h4v.012a2 2 0 01-2 1.988z"></path>
              </g>
            </svg>
          </div>

          <span className="whitespace-nowrap bg-[#9147ff] text-white px-4 py-2 flex gap-2 items-center rounded">
            <svg fill="#fff" width="20px" height="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
              <g>
                <path
                  fillRule="evenodd"
                  d="M11.456 8.255L10 5.125l-1.456 3.13-3.49.485 2.552 2.516-.616 3.485L10 13.064l3.01 1.677-.616-3.485 2.553-2.516-3.491-.485zM7.19 6.424l-4.2.583c-.932.13-1.318 1.209-.664 1.853l3.128 3.083-.755 4.272c-.163.92.876 1.603 1.722 1.132L10 15.354l3.579 1.993c.846.47 1.885-.212 1.722-1.132l-.755-4.272 3.128-3.083c.654-.644.268-1.723-.664-1.853l-4.2-.583-1.754-3.77c-.406-.872-1.706-.872-2.112 0L7.19 6.424z"
                  clipRule="evenodd"
                ></path>
              </g>
            </svg>
            Subscribe{' '}
            <svg width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
              <path d="M14.5 6.5 10 11 5.5 6.5 4 8l6 6 6-6-1.5-1.5z"></path>
            </svg>
          </span>
          <svg width="25px" height="25px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
            <g>
              <path d="M10 18a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM8 4a2 2 0 104 0 2 2 0 00-4 0z"></path>
            </g>
          </svg>
        </div>
      </nav>
    </CardLayout>
  );
}
