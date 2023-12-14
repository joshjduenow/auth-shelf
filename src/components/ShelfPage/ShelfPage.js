import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelfReducer = useSelector(store => store.shelfReducer);
  console.log("shelf reducer:", shelfReducer);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_SHELF" });
  }, []);
  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {shelfReducer.map(shelf => {
        return (
          <div>
            <ul>
              <li>
                {shelf.description}
              </li>
              <img src={shelf.image_url}></img>
            </ul>
          </div>
        )
      })}
    </div>
  );
}

export default ShelfPage;
