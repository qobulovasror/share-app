function AddItemWin() {
  return (
    <>
      <div className="addItemWin">
        <h3 className="t-center">Add item to collection</h3>
        <label htmlFor="toCollection">
          <select name="col" id="col">
            <option selected value="">
              col 1
            </option>
            <option value="">col 2</option>
            <option value="">col 3</option>
          </select>
        </label>
        <ul className="itemType row">
          <li>
            <input checked type="radio" name="searchType" id="link" />
            <label htmlFor="link">link</label>
          </li>
          <li>
            <input type="radio" name="searchType" id="text" />
            <label htmlFor="text">text</label>
          </li>
          <li>
            <input type="radio" name="searchType" id="file" />
            <label htmlFor="file">file</label>
          </li>
        </ul>
        <ul className="itemBody">
          <li className="typeFile">
            <label htmlFor="nameFile">Name</label>
            <input type="text" name="nameFile" id="nameFile" />
            <label htmlFor="file">File</label>
            {/* <input type="file" placeholder="file" id="file" value="file" />*/}
            <label htmlFor="tagsFile">#tags</label>
            <input type="text" name="tagsFile" id="tagsFile" />
            <label htmlFor="desFile">description</label>
            <textarea id="desFile" cols="30" rows="2"></textarea>
            <label htmlFor="keyFile">key</label>
            <input type="text" id="keyFile" />
            <ul className="tags row wrap">
              <li>none</li>
            </ul>
          </li>
          <li className="typeLink">
            <label htmlFor="nameLink">Name</label>
            <input
              type="text"
              name="nameLink"
              id="nameLink"
              placeholder="name"
            />
            <label htmlFor="link">Link</label>
            <input type="text" placeholder="link" id="link" />
            <label htmlFor="tagsLink">#tags</label>
            <input type="text" id="tagsLink" placeholder="tags" />
            <label htmlFor="desLink">description</label>
            <textarea id="desLink" cols="30" rows="2"></textarea>
            <label htmlFor="keyLink">key</label>
            <input type="text" id="keyLink" />
            <ul className="tags row wrap">
              <li>none</li>
            </ul>
          </li>
          <li className="typeText">
            <label htmlFor="nameText">Name</label>
            <input
              type="text"
              name="nameText"
              id="nameText"
              placeholder="name"
            />
            <label htmlFor="textText">Text</label>
            <textarea
              id="textText"
              cols="30"
              rows="5"
              placeholder="text"
            ></textarea>
            <input
              type="text"
              name="tagsText"
              id="tagsText"
              placeholder="tags"
            />
            <label htmlFor="desText">description</label>
            <textarea id="desText" cols="30" rows="2"></textarea>
            <label htmlFor="keyText">key</label>
            <input type="text" id="keyText" />
            <label htmlFor="tagsText">#tags</label>
            <ul className="tags row wrap">
              <li>none</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AddItemWin;
