import React from 'react';

export const ImagePopup = ({ card, onClose }) => (
		<div className={Object.keys(card).length !== 0 ? 'popup popup_image popup_opened' : 'popup popup_image'} id="popup-pictures" onClick={onClose}>
			<div className="popup__content-image">
                <button
                    className="popup__icon-close popup__icon-close_image"
                    type="button"
                />
				<img className="popup__image-foto" src={card.link} alt={card.name} />
				<p className="popup__text">{card.name}</p>
			</div>
		</div>
	)