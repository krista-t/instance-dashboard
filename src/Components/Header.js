import logo from "../assets/logo.svg";
const Header = () => {
  return (
    <header className="header-container">
      <div className="flex-container">
        <div className="logo">
          <img height={100} src={logo} alt="logo" />
        </div>
        <nav className="navigation">
          <ul>
            <li>HOME</li>
            <li>DASHBOARD</li>
            <li style={{ visibility: "hidden" }}>LINK</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
