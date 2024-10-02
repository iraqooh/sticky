import Plus from "../icons/Plus";
import colors from '../assets/colors.json'
import { useRef, useContext } from 'react'
import { db } from '../appwrite/databases'
import { Context } from "../context/Context";
 
const AddButton = () => {
    const {setNotes} = useContext(Context)
    const initialPosition = useRef(36)

    const addNote = async () => {
        const payload = {
            body: 'New note...',
            position: JSON.stringify({
                x: initialPosition.current,
                y: initialPosition.current
            }),
            colors: JSON.stringify(colors[2])
        }

        initialPosition.current += 36

        try {
            const response = await db.notes.create(payload)
            setNotes((prevState) => [response, ...prevState])
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton