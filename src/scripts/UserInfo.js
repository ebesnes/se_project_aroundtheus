export default class UserInfo {
    constructor ({ profileTitleSelector, profileDescriptionSelector }) {
        this._profileTitle = document.querySelector(profileTitleSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
    }

    //retrieves existing user text
    getUserInfo(){
        return{
            profileTitle: this._profileTitle.textContent,
            profileDescription: this._profileDescription.textContent,
        };
    }

    //updates user text
    setUserInfo({ profileTitle, profileDescription }){
        if (profileTitle) this._profileTitle.textContent = profileTitle;
        if (profileDescription) this._profileDescription.textContent = profileDescription;
    }
}
