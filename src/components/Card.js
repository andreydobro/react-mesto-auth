import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {

    const user = useContext(CurrentUserContext)

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === user._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__back ${isOwn ? 'element__back' : 'element__back hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === user._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`
	element__like ${isLiked ? 'element__like_active' : ''}`)

    const handleClick = () => {
        onCardClick(card)
    }

    const handleLikeClick = () => {
		onCardLike(card)
	}
	const handleDeleteClick = () => {
		onCardDelete(card)
	}

    return (
        <li className="element">
            <button className={cardDeleteButtonClassName} tupe="button" onClick={handleDeleteClick}></button>
            <img className="element__foto" src={card.link} alt={card.name} onClick={handleClick} />
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-form">
                <button 
                className={cardLikeButtonClassName} 
                type="button" 
                onClick={handleLikeClick}></button>
                <div className="element__like-count">{card.likes.length}</div>
            </div>
        </li>
    )
}