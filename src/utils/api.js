const apiData = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
      authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58',
      'Content-Type': 'application/json'
    },
  }  

class Api {
    constructor(config) {
        this._url = config.url;
        this._header = config.headers;
    }

    _requestResult(response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(
            `Ошибка ${response.status} - ${response.statusText}`
          );
        }
      }

      //Запрос карточек с сеервера
      getInitialCards() {
        return fetch(`${this._url}/cards`, {
          headers: this._header})
          .then(this._requestResult)
      }

      //Запрос данных профиля с сервера
      getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._header})
            .then(this._requestResult)
    }

    editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({ name, about })
        })
        .then(this._requestResult)
    }

    editUserAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({ avatar })
        })
        .then(this._requestResult)
    }

    createCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({ name, link })
        })
        .then(this._requestResult)
    }

    addLikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._header,
        })
        .then(this._requestResult)
      }
    
      removeLikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._header,
        })
        .then(this._requestResult)
      }
    
    
      deleteCard(cardId) {
        console.log(cardId)
        return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._header,
        })
        .then(this._requestResult)
      }
}

export const api = new Api(apiData)