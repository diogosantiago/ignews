import { useEffect, useState } from "react"

export function Async(){
    const [isButtonVisible, setIsButtonVisisble] = useState(false)
    const [isButtonInvisible, setIsButtonInvisisble] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsButtonVisisble(true)
            setIsButtonInvisisble(true)
        }, 1000)
    }, [])

    return (
        <div>
            <div>Hello World</div>
            { isButtonVisible && <button>Button</button>}
            { !isButtonInvisible && <button>Botao</button>}
        </div>
    )
}