import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/Context';
import { db } from '../appwrite/databases'

const Color = ({ color }) => {
    const {selectedNote, notes, setNotes} = useContext(Context)

    const changeColor = async () => {
        try {
            const currentIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            )

            const updatedNote = {
                ...notes[currentIndex],
                colors: JSON.stringify(color)
            }

            const newNotes = [...notes]
            newNotes[currentIndex] = updatedNote
            setNotes(newNotes)

            await db.notes.update(selectedNote.$id, {
                colors: JSON.stringify(color)
            })
        } catch(error) {
            console.error('You must select a note before changing its color');
            Swal.fire('You must select a note before changing its color!')
        }
    };
 
    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
}

export default Color