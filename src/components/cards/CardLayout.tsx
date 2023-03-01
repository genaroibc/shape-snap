type Props = { width: number; height: number; children: React.ReactNode };

export function CardLayout({ width, height, children }: Props) {
  return (
    <article className="shadow-2xl flex flex-col p-4 gap-4">
      <div className="w-full flex flex-col gap-4 pb-12 border-2 border-gray-300 overflow-hidden">{children}</div>

      <div className="flex gap-4 justify-center items-center">
        <figcaption className="text-gray-800">
          {width}x{height}
        </figcaption>
      </div>
    </article>
  );
}
