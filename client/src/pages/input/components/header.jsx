import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <div className="header set">
        <div className="container">
          <div className="row between">
            <Link to="/" className="logo">
              <i className="bx bxs-share-alt">Share</i>
            </Link>
            <div className="profil">A</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
