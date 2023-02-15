function ItemView() {
  return (
    <>
      <div className="itemView">
        <h3 className="t-center">Item name</h3>
        <ul>
          <li className="typeFileView">
            <button className="btnDownload">Download</button>
            <div className="column">
              <span>Description</span>
              <p className="descrip">description</p>
            </div>
            <ul className="tags row wrap">
              <li>none</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ItemView;
