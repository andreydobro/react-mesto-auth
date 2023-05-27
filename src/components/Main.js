import React, { useContext, useState } from "react";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Main = ({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) => {
  //const [cards, setCards] = useState([]);

  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__content">
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="фото пользователя"
            onClick={onEditAvatar}
          />
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button profile__edit-button_opened"
              type="button"
              onClick={onEditProfile}
            />
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button profile__add-button_opened"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <ul className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} />
        ))}
      </ul>
    </main>
  )
}