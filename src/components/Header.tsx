export function Header() {
  return (
    <header className="absolute top-0 left-0 w-full bg-primary-darker">
      <div className="m-auto max-w-[1000px] flex justify-between gap-4 p-4 items-center text-tertiary font-semibold">
        <img src="/assets/transparent-rectangular-logo.png" alt="Shape Snap logotype" width="150" />
        <nav>
          <ul className="flex gap-4 w-full self-end">
            <li>
              <a href="#home" className="font-normal">
                Home
              </a>
            </li>
            <li>
              <a href="#home" className="font-normal">
                About
              </a>
            </li>
            <li>
              <a href="#home" className="font-normal">
                GitHub
              </a>
            </li>
            <li>
              <a href="#home" className="font-normal">
                Home
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
