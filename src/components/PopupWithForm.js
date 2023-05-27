import React from "react";

export const PopupWithForm = (props) => {
  return (
    <section
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
      id={props.name}
      /*onClick={props.onClose}*/>

      <div className="popup__content">
        <h2 className="popup__title">{props.title}</h2>

        <button
          className="popup__icon-close"
          type="button"
          onClick={props.onClose} />

        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}>

          {props.children}
          <button className={`popup__button-save popup__button-save_${props.name}`} type={props.title}>{props.btnName}

          </button>
        </form>
      </div>
    </section>
  )
}