import React from 'react'
import Trash from '../icons/Trash'
import { db } from '../appwrite/databases'
import { useContext } from 'react'
import { Context } from '../context/Context'

const DeleteButton = ({noteId}) => {
    const {setNotes} = useContext(Context)

    const confirmDelete = () => {
        Swal.fire({
            title: "Delete",
            text: "Are you sure you want to delete?",
            icon: "danger",
            showCancelButton: true,
            confirmButtonColor: "#f00",
            cancelButtonColor: "d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNote()
            }
        })
    }

    const deleteNote = async () => {
        try {
            await db.notes.delete(noteId)
            setNotes((prevState) =>
                prevState.filter((note) => note.$id !== noteId)
            )
            Swal.fire('Deleted')
        } catch (error) {
            Swal.fire(error)
        }
    }

    return (
        <div onClick={confirmDelete}><Trash /></div>
    )
}

export default DeleteButton