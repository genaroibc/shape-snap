import { useCallback, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

type Props = {
  handleDownload: () => void;
};

export function DownloadBannersButton({ handleDownload }: Props) {
  const handleDownloadButtonClick = () => {
    handleDownload();
    fireConfetti();
  };

  const refAnimationInstance = useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeConfettiShot = useCallback((particleRatio: number, opts: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animationInstance = refAnimationInstance.current as unknown as (opts: any) => void;

    refAnimationInstance.current &&
      animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);

  const fireConfetti = useCallback(() => {
    makeConfettiShot(0.25, {
      spread: 26,
      startVelocity: 55
    });

    makeConfettiShot(0.2, {
      spread: 60
    });

    makeConfettiShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeConfettiShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    makeConfettiShot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, [makeConfettiShot]);

  return (
    <nav className="sticky bottom-32">
      <button className="max-w-fit flex gap-2 items-center justify-center mx-auto" onClick={handleDownloadButtonClick}>
        Download banners
        <svg className="w-8 max-w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M20 15V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 15M8 11L12 15M12 15L16 11M12 15V3"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{' '}
          </g>
        </svg>
      </button>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0
        }}
      />{' '}
    </nav>
  );
}
