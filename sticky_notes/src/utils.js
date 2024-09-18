export const setNewOffset = (card, dragDisplacement = { x: 0, y: 0}) => {
    const offsetLeft = card.offsetLeft - dragDisplacement.x
    const offsetTop = card.offsetTop - dragDisplacement.y

    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop
    }
}

export const cardGrow = (textarea) => {
    const {current} = textarea

    current.style.height = "auto"
    current.style.height = current.scrollHeight + "px"
}

export const bringToFront = (selectedCard) => {
    selectedCard.style.zIndex = 999
 
    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    })
}

export const bodyParser = (value) => {
    try {
        return JSON.parse(value)
    } catch (err) {
        return value
    }
}