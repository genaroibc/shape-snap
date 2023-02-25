export function Header() {
  return (
    <header
      style={{
        WebkitBackdropFilter: 'blur(8px)'
      }}
      className="sticky top-0 left-0 w-full shadow-md  backdrop-blur-[8px]"
    >
      <div className="m-auto max-w-[1000px] flex justify-between gap-4 p-4 items-center font-semibold">
        <img src="public/assets/logo/transparent-rectangular-logo.svg" alt="Shape Snap logotype" width="150" />
        <nav>
          <ul className="flex gap-4 w-full self-end">
            <li>
              <a href="#home" className="font-normal text-gray-800 hover:text-black">
                Home
              </a>
            </li>
            <li>
              <a href="#home" className="font-normal text-gray-800 hover:text-black">
                About
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
