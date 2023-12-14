import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";

export default function ShelfForm() {
    const [descriptionInput, setDescriptionInput] = useState('');
    const [urlInput, setUrlInput] = useState('');

    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Handling submit');
        dispatch({
            type: 'SAGA_POST_SHELF',
            payload: {
                url: urlInput, 
                description: descriptionInput, 
                userID: user.id
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}> 
            <input
            type='text'
            placeholder="Image Link"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            />
            <input
            type='text'
            placeholder="Description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            />
            <button>Submit</button>
        </form>
    )
}