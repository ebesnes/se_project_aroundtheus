export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Check server response
  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _extractData(payload) {
    if (
      payload &&
      typeof payload === "object" &&
      Object.prototype.hasOwnProperty.call(payload, "data")
    ) {
      return payload.data;
    }
    return payload;
  }

  //CARD
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => this._handleServerResponse(res))
      .then((data) => this._extractData(data));
  }
  //Add new card to server
  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    })
      .then((res) => this._handleServerResponse(res))
      .then((data) => this._extractData(data));
  }
  //Delete card by ID from server
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._handleServerResponse(res))
      .then((data) => this._extractData(data));
  }
  //Like card by ID on server
  cardLikeStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
      .then((res) => this._handleServerResponse(res))
      .then((data) => this._extractData(data));
  }
  addLike(cardId) {
    return this.cardLikeStatus(cardId, false);
  }

  removeLike(cardId) {
    return this.cardLikeStatus(cardId, true);
  }

  //USER
  //Get user info from server
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => this._handleServerResponse(res))
      .then((data) => this._extractData(data));
  }
  //Update user info on server
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._handleServerResponse(res))
      .then((resData) => this._extractData(resData));
  }
  //Update avatar
  updateUserAvatar(avatarLink) {
    const avatar =
      typeof avatarLink === "string" ? avatarLink : avatarLink?.avatar;
    if (!avatar) {
      return Promise.reject("Avatar link is required");
    }
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then((res) => this._handleServerResponse(res))
      .then((data) => this._extractData(data));
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
