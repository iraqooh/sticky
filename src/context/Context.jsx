import { createContext, useEffect, useState } from "react";
import { db } from '../appwrite/databases'
import Spinner from "../icons/Spinner";

export const Context = createContext()

const Provider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)

    useEffect(() => {
        init()
      }, [])

    const init = async () => {
        try {
          const response = await db.notes.list()
          setNotes(response.documents)
          setLoading(false)
        } catch (error) {
          console.error(`Failed to fetch notes: ${error}`);
        }
    }

    const contextData = {notes, setNotes, selectedNote, setSelectedNote}

    return (
        <Context.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            ) : (children)}
        </Context.Provider>
    )
}

export default Provider