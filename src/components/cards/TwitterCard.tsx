import { TransformedImageBanner } from '../../types';
import { CardLayout } from './CardLayout';

type Props = TransformedImageBanner;

export function TwitterCard({ url, height, width }: Props) {
  return (
    <CardLayout {...{ height, width }}>
      <figure className="flex flex-col gap-4 bg-white relative">
        <img
          className="object-cover aspect-square w-1/5 rounded-full absolute right-[77%] bottom-0 translate-y-1/2 border-[3px] md:border-[5px] border-white"
          src={url}
          alt="Twitter avatar"
          title="Twitter avatar"
        />
        <img className="object-cover" src={url} alt="Twitter banner" title="Twitter banner" />
      </figure>

      <nav className="flex flex-col items-start sm:flex-row sm:items-center gap-4 pt-16 sm:pt-0 w-full justify-end px-6">
        <div className="flex gap-4">
          <svg className="rounded-full w-12 p-2 border-2" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </g>
          </svg>
          <svg className="rounded-full w-12 p-2 border-2" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
            </g>
          </svg>
          <svg className="rounded-full w-12 p-2 border-2" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3zm-.86 13h-4.241c-.464 2.281-2.482 4-4.899 4s-4.435-1.719-4.899-4H2.87L4 9.05C4.51 5.02 7.93 2 12 2v2C8.94 4 6.36 6.27 5.98 9.3L5.13 16h13.73l-.38-3h2.02l.64 5zm-6.323 0H9.183c.412 1.164 1.51 2 2.817 2s2.405-.836 2.817-2z"></path>
            </g>
          </svg>
        </div>

        <span className="border-2 w-fit rounded-full grid place-content-center px-4 py-2 font-medium text-lg">
          Following
        </span>
      </nav>

      <div className="text-left ml-12 mt-10">
        <div className="flex gap-1 text-3xl font-semibold">
          Twitter
          <svg viewBox="0 0 22 22" width="28" height="28">
            <g>
              <path
                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                fill="#1d9bf0"
              ></path>
            </g>
          </svg>
        </div>
        <span className="flex gap-1 text-gray-700 font-normal">@twitter</span>
      </div>
    </CardLayout>
  );
}
