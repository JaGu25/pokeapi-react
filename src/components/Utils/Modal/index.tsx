import React, { useContext, useEffect, useRef } from 'react'
import { PokemonContext } from '../../../store/pokemon/pokemonContext'
import './index.scss'

interface IProps {
    show?: boolean,
    showFooter?: boolean,
    handleCloseModal?: (e?: any) => void,
    ContentComponent: React.FC
}

const Modal: React.FC<IProps> = ({
    show = false,
    showFooter = false,
    handleCloseModal = () => { },
    ContentComponent
}) => {

    const ref = React.useRef() as React.LegacyRef<HTMLDivElement>;
    const { pokemon } = useContext(PokemonContext)

    const capitalizeFirstLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            // @ts-ignore
            if (ref.current && !ref.current.contains(e.target)) {
                handleCloseModal();
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [])

    return (
        <div className="modal" style={{ display: show ? "block" : "none" }}>
            <div className="modal__content" ref={ref}>
                <div className="modal__header">
                    <span className="close" onClick={handleCloseModal}>&times;</span>
                    <h2 className="title">{capitalizeFirstLetter(pokemon?.name || '')}</h2>
                </div>
                <div className="modal__body">
                    <ContentComponent />
                </div>
                {
                    showFooter && (<div className="modal__footer">
                        {/* TO DO FOOTER */}
                    </div>)
                }
            </div>
        </div>
    )
}

export default Modal
