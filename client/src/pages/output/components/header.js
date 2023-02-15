import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="header row between">
        <div className="logo">
          <Link to="/">
            <i className="bx bxs-share-alt">Share</i>
          </Link>
        </div>
        <div className="row">
          <div className="setting">
            <i className="bx bxs-brightness"></i>
          </div>
          <div className="joing">
            <Link to="/input">
              <i className="bx bx-plus"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
