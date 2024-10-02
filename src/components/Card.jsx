import { useRef, useEffect, useState, useContext } from 'react'
import { db } from '../appwrite/databases'
import Spinner from '../icons/Spinner'
import { setNewOffset, cardGrow, bringToFront, bodyParser } from '../utils'
import DeleteButton from './DeleteButton'
import { Context } from '../context/Context'

const Card = ({ note }) => {
    const [isSaving, setIsSaving] = useState(false);
    const typingTimer = useRef(null);
    const body = bodyParser(note.body)
    const [position, setPosition] = useState(JSON.parse(note.position))
    const colors = JSON.parse(note.colors)

    const {setSelectedNote} = useContext(Context)

    let pointerPosition = {x: 0, y: 0}
    const cardRef = useRef(null)

    const textAreaRef = useRef(null);

    useEffect(() => {
        cardGrow(textAreaRef)
        bringToFront(cardRef.current)
    }, [])

    const clickCardHeader = (event) => {
        if (event.target.className === "card-header") {
            pointerPosition.x = event.clientX
            pointerPosition.y = event.clientY

            document.addEventListener('mousemove', dragCard)
            document.addEventListener('mouseup', dropCard)

            bringToFront(cardRef.current)
            setSelectedNote(note)
        }
    }

    const dragCard = (event) => {
        const dragDirection = {
            x: pointerPosition.x - event.clientX,
            y: pointerPosition.y - event.clientY
        }

        pointerPosition.x = event.clientX
        pointerPosition.y = event.clientY

        const newPosition = setNewOffset(cardRef.current, dragDirection)

        setPosition(newPosition)
    }

    const dropCard = (event) => {
        document.removeEventListener('mousemove', dragCard)
        document.removeEventListener('mouseup', dropCard)

        const newPosition = setNewOffset(cardRef.current)
        db.notes.update(note.$id, {'position': JSON.stringify(newPosition)})
        saveState('position', newPosition)
    }

    const saveState = async (key, value) => {
        const payload = {[key]: JSON.stringify(value)}

        try {
            await db.notes.update(note.$id, payload)
        } catch(error) {
            console.error(`Update error: ${error}`);
        }

        setIsSaving(false)
    } 

    const pauseTyping = () => {
        setIsSaving(true)

        if (typingTimer.current) {
            clearTimeout(typingTimer.current)
        }

        typingTimer.current = setTimeout(() => {
            saveState('body', textAreaRef.current.value)
        }, 2000)
    }

    return (
        <div 
            ref={cardRef}
            className='card'
            style={{ 
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div 
                onMouseDown={clickCardHeader}
                className='card-header'
                style={{ backgroundColor: colors.colorHeader }}
            >
                <DeleteButton noteId={note.$id}/>
                {
                    isSaving && (
                        <div className="card-saving">
                            <Spinner color={ colors.colorText }/>
                            <span style={{ color: colors.colorText }}>Saving...</span>
                        </div>
                    )
                }
            </div>
            <div className='card-body'>
                <textarea 
                    onKeyUp={pauseTyping}
                    onFocus={() => {
                        bringToFront(cardRef.current)
                        setSelectedNote(note)
                    }}
                    ref={textAreaRef}
                    defaultValue={body}
                    style={{ color: colors.colorText }}
                    onInput={() => cardGrow(textAreaRef)}>
                </textarea>
            </div>
        </div>
    )
}

export default Card