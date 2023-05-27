import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { PopupWithForm } from "./PopupWithForm";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    //Подписка на контекст
    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser ? currentUser.name : '');
        setAbout(currentUser ? currentUser.about : '');
    }, [currentUser, isOpen]);

    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleAboutChange(evt) {
        setAbout(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        onUpdateUser({ name: name, about: about });
    }

    return (
        <PopupWithForm
            name={'edit'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            btnName={isLoading ? "Сохранение..." : "Сохранить"}
            title={'Редактировать профиль'} >
            <label className="popup__label">
                <input
                    id="nameuser"
                    className="popup__input_name_edit popup__input"
                    name="name"
                    type="text"
                    minLength={2}
                    maxLength={40}
                    required=""
                    placeholder="Имя"
                    onChange={handleNameChange}
                    value={name || ''}
                />
                <span id="nameuser-error" className="popup__error" />
            </label>
            <label className="popup__label">
                <input
                    id="aboutuser"
                    className="popup__input_about_edit popup__input"
                    name="about"
                    type="text"
                    minLength={2}
                    maxLength={200}
                    required=""
                    placeholder="О себе"
                    onChange={handleAboutChange}
                    value={about || ''}
                />
                <span id="aboutuser-error" className="popup__error" />
            </label>
        </PopupWithForm>
    )
}