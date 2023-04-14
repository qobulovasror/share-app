// import { getStorage, ref } from "firebase/storage";

function AddFile() {
  const submitHandler = (e) => {
    e.preventDefault()
    // Create a root reference
    // const storage = getStorage();

    // Create a reference to 'mountains.jpg'
    // const mountainsRef = ref(storage, 'mountains.jpg');

    // Create a reference to 'images/mountains.jpg'
    // const mountainImagesRef = ref(storage, 'images/mountains.jpg');

    // While the file names are the same, the references point to different files
    // mountainsRef.name === mountainImagesRef.name;           // true
    // mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
  };
  return (
    <li className="typeFile">
      <form onSubmit={submitHandler}>
        <label htmlFor="nameFile">Name</label>
        <input type="text" name="nameFile" id="nameFile" />
        <label htmlFor="file">File</label>
        <input type="file" placeholder="file" id="file" />
        <label htmlFor="tagsFile">#tags</label>
        <input type="text" name="tagsFile" id="tagsFile" />
        <label htmlFor="desFile">description</label>
        <textarea 
          id="desFile"
          cols="30"
          rows="2"
          placeholder="description"
        ></textarea>
        <label htmlFor="keyFile">key</label>
        <input type="text" id="keyFile" placeholder="password for open" />
        <ul className="tags row wrap">
          <li>none</li>
        </ul>
        <input type="submit" className="btn" value={"Submit"} />
      </form>
    </li>
  );
}

export default AddFile;
