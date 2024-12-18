const Header = () => {
  return (
    <header className="flex bg-danger-light h-[5rem] sticky top-0 w-full">
      <nav className="container flex flex-col items-center justify-center space-y-2 mobile:justify-between mobile:flex-row">
        <div>
          <h1 className="flex items-baseline text-xl font-bold mobile:flex-col mobile:text-2xl laptop:text-3xl">
            Pokedex&nbsp;{" "}
            <span className="text-sm mobile:text-base">
              by{" "}
              <a
                href="https://github.com/sakakara"
                target="_blank"
                className="nav-link"
              >
                Sakakara
              </a>{" "}
              &{" "}
              <a
                href="https://github.com/tidjee-dev"
                target="_blank"
                className="nav-link"
              >
                Tidjee
              </a>
            </span>
          </h1>
        </div>
        <div className="text-base font-semibold mobile:text-lg">
          <input
            type="text"
            placeholder="Search a Pokemon ..."
            className="p-1 rounded-lg placeholder:text-center mobile:placeholder:pl-2 mobile:placeholder:text-left bg-danger-subtle placeholder:text-muted"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
