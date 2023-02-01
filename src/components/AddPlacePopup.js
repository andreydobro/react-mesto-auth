import React, { useState, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault(e);
    onAddPlace({ name: name, link: link });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen])

  return (
    <PopupWithForm
       name={'add'}
       isOpen={isOpen}
       onClose={onClose}
       btnName={isLoading ? "Сохранение..." : "Создать"}
       onSubmit={handleAddPlaceSubmit}
       title={'Новое место'}>
      <label className="popup__label">
              <input
                id="name"
                className="popup__input_name_add popup__input popup__input_name_edit"
                name="name"
                type="text"
                placeholder="Название"
                required=""
                minLength={2}
                maxLength={30}
                value={name}
                onChange={handleNameChange}
              />
              <span id="name-error" className="popup__error">
                Заполните поле
              </span>
            </label>
            <label className="popup__label">
              <input
                id="url"
                className="popup__input_about_add popup__input"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                required=""
                value={link}
                onChange={handleLinkChange}
              />
              <span id="url-error" className="popup__error">
                Заполните поле
              </span>
            </label>
      </PopupWithForm>
  )
}