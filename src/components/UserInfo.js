export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarElement }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarElement);
  }

  //retrieves existing user text
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatarElement.src,
    };
  }

  //updates user text
  setUserInfo({ name, about, avatar }) {
    if (name) this._name.textContent = name;
    if (about) this._about.textContent = about;
    if (avatar) this._avatarElement.src = avatar;
  }

  updateUserAvatar(link) {
    this._avatarElement.src = link;
  }
}
