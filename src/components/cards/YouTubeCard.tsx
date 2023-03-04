import { TransformedImageBanner } from '../../types';
import { CardLayout } from './CardLayout';

type Props = TransformedImageBanner;

export function YouTubeCard({ name, url, height, width }: Props) {
  return (
    <CardLayout {...{ height, width, name }}>
      <figure className="flex flex-col gap-4">
        <img
          className="object-cover"
          src={url}
          alt={`YouTube banner in ${name} resolution`}
          title={`YouTube banner in ${name} resolution`}
        />
      </figure>

      <nav className="w-10/12 m-auto flex gap-4 items-center justify-between">
        <div className="flex justify-start items-center gap-4">
          <div className="w-2/12 rounded-full">
            <img
              className="object-cover aspect-square w-full rounded-full max-w-sm"
              src={url}
              alt="YouTube avatar"
              title="YouTube avatar"
            />
          </div>

          <div className="flex flex-col gap-2 leading-3 font-medium text-gray-600 text-left">
            <span className="flex items-center gap-2 text-xl font-medium text-black leading-normal">
              youtube
              <svg
                fill="#555"
                width="15"
                height="auto"
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M9.8,17.3l-4.2-4.1L7,11.8l2.8,2.7L17,7.4 l1.4,1.4L9.8,17.3z"></path>
                </g>
              </svg>
            </span>
            <div className="flex gap-2 justify-start items-center text-xs">
              <span className="font-medium">@youtube</span>
              <span>230.000 subscribers</span>
              <span>286 videos</span>
            </div>

            <span className="font-normal mt-2 text-gray-700 text-sm">YouTube channel description</span>
          </div>
        </div>

        <span className="grid place-content-center bg-black text-white px-4 py-2 text-xs leading-normal rounded-3xl">
          Subscribe
        </span>
      </nav>
    </CardLayout>
  );
}
