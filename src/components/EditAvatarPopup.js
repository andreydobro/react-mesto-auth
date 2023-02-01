import React, { useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault(e);
    onUpdateAvatar({ avatar: avatarInputRef.current.value });
  }

  return (
    <PopupWithForm
    name={'avatar'}
    isOpen={isOpen}
    onClose={onClose}
    btnName={isLoading ? "Сохранение..." : "Сохранить"}
    onSubmit={handleSubmit}
    title={'Обновить аватар'}>
          <label className="popup__label">
            <input
              id="avatar"
              className="popup__input_name_add popup__input popup__input_name_edit popup__input_avatar"
              defaultValue=""
              name="avatar"
              type="url"
              placeholder="Ссылка на картинку"
              required=""
              ref={avatarInputRef}
            />
            <span id="avatar-error" className="popup__error">
              Заполните поле
            </span>
          </label>
    </PopupWithForm>
  )
}