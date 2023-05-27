import React from 'react';

function ImagePopup ({ card, onClose }) {

	const handleOverlay = (event) => {
		// если есть `popup_opened` в классах блока, значит, кликнули на оверлей
		if (event.target.classList.contains("popup_opened")) {
		  onClose();
		}
	  };

	
	return(
		<div className={Object.keys(card).length !== 0 ? 'popup popup_image popup_opened' : 'popup popup_image'} id="popup-pictures" onClick={handleOverlay} >
			<div className="popup__content-image">
                <button
                    className="popup__icon-close popup__icon-close_image"
                    type="button"
					onClick={onClose}
                />
				<img className="popup__image-foto" src={card.link} alt={card.name} />
				<p className="popup__text">{card.name}</p>
			</div>
		</div>
	)
}

export default ImagePopup;