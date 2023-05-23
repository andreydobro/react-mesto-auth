import React, { useEffect, useState } from 'react';
import '../index';
import { Header } from './Header';
import { Main } from './Main'
import { Footer } from './Footer'
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { EditProfilePopup } from './EditProfilePopup'
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from './Auth';
import { getByTestId } from '@testing-library/react';

export const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  useEffect(() => {
    api.getUserInfo()
      .then(data => setCurrentUser(data))
      .catch((err) => console.log(err))
  }, [])

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({})
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleConfirmDeleteClick() {
    setIsConfirmDeletePopupOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .addLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при установке лайка: ${err}`);
        });
    } else {
      api
        .removeLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при удалении лайка: ${err}`);
        });
    }
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUserInfo(data.name, data.about)
      .then((formData) => {
        setCurrentUser(formData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при редактировании профиля", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editUserAvatar(data.avatar)
      .then((formData) => {
        setCurrentUser(formData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при редактировании аватара", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdatePlaces(data) {
    setIsLoading(true);
    api
      .createCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при добавлении новой карточки", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err}`);
      });
  }

  function onRegister(email, password) {
    auth.register(email, password).then(() => {
      //setPopupImage(resolve);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    }).catch(() => {
      //setPopupImage(reject);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    })
    //.finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth.autohorize(email, password).then((res) => {
      // localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmail(email);
      navigate("/");
    }).catch(() => {
      //setPopupImage(reject);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      //handleInfoTooltip();
    });
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setIsLoggedIn(true);
            navigate('/');
          }
        })
        .catch(err => {
          console.log('Переданный токен некорректен.');
          setIsLoggedIn(false);
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="*" element={
            isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
          } />
          <Route path='/signup' element={<Register onRegister={onRegister} navigate={navigate}/>} />
          <Route path='/signin' element={<Login onLogin={onLogin} navigate={navigate} />} />
          <Route path='/' element={
            <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
              <Header />
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </ProtectedRoute>
          }
          />
        </Routes>

      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleUpdatePlaces}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      <PopupWithForm
        onClose={closeAllPopups}
        title="Вы уверены?"
        name="confirmation"
        isOpen={isConfirmDeletePopupOpen}
        btnName="Да"
      />
      {/**/}
    </CurrentUserContext.Provider>

  );
}

export default App;