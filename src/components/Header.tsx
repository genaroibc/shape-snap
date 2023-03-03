export function Header() {
  return (
    <header
      style={{
        WebkitBackdropFilter: 'blur(8px)'
      }}
      className="md:sticky z-40 top-0 left-0 w-full shadow-sm bg-white/80 backdrop-blur-[8px]"
    >
      <div className="m-auto max-w-[1400px] flex flex-col md:flex-row justify-between gap-4 p-4 items-center font-semibold">
        <img src="/assets/logo/transparent-rectangular-logo.svg" alt="Shape Snap logotype" width="150" />
        <nav className="block">
          <ul className="flex gap-4 w-full self-end">
            <li>
              <a href="#top" className="font-normal text-gray-800 hover:text-black">
                Home
              </a>
            </li>
            <li>
              <a href="#playground" className="font-normal text-gray-800 hover:text-black">
                Playground
              </a>
            </li>
            <li>
              <a href="#home" className="font-normal text-gray-800 hover:text-black">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
