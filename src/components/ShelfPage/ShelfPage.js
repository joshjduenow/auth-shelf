import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShelfForm from "../ShelfForm/ShelfForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelfReducer = useSelector((store) => store.shelfReducer);
  console.log("shelf reducer:", shelfReducer);
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_SHELF" });
  }, []);

  const deleteImage = (shelf) => {

    // console.log('Handling delete', e);
    console.log('shelf', shelf);
    dispatch({
        type: 'SAGA_DELETE_SHELF',
        payload: {user_id: user.id, 
        itemId: shelf.id}
    })

}

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {shelfReducer.map((shelf) => {
        return (
          <>
          <div>
            <ul>
              <li>{shelf.description}</li>
              <img src={shelf.image_url} />
              <button onClick={() => deleteImage(shelf)}>delete</button>
            </ul>
          </div>
          </>
        );
      })}
      <ShelfForm />
    </div>
  );
}

export default ShelfPage;
