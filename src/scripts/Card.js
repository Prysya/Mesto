export default class Card {
  constructor(data, imagePopup, handleCardRequest, owner) {
    this.data = data;
    this.imagePopup = imagePopup;
    this.handleCardRequest = handleCardRequest;
    this.owner = owner;

    this._card = null;
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
  }

  template() {
    const templateString = `
      <div class="place-card">
        <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <div class="place-card__like-container">
            <button class="place-card__like-icon"></button>
            <p class="place-card__like-count"></p>
          </div>
        </div>
      </div>
    `;
    const element = document.createElement("div");

    element.insertAdjacentHTML("beforeend", templateString.trim());

    return element.firstChild;
  }

  create() {
    this._card = this.template();

    this._card.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${this.data.link})`;
    this._card.querySelector(".place-card__name").textContent = this.data.name;
    this._card.setAttribute("id", `${this.data._id}`);

    this._setLikeCount(this.data.likes.length);

    if (this.data.owner._id === this.owner.ownerId) {
      this._card.querySelector(".place-card__delete-icon").style.display =
        "block";
    }

    if (this.data.likes.some((like) => like._id === this.owner.ownerId)) {
      this._card
        .querySelector(".place-card__like-icon")
        .classList.add("place-card__like-icon_liked");
    }

    this.setListeners();

    return this._card;
  }

  setListeners() {
    this._card
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this._card
      .querySelector(".place-card__image")
      .addEventListener("click", this.imagePopup);
    if (this.data.owner._id === this.owner.ownerId) {
      this._card
        .querySelector(".place-card__delete-icon")
        .addEventListener("click", this.remove);
    }
  }

  like() {
    const likeIcon = this._card.querySelector(".place-card__like-icon");
    if (likeIcon.classList.contains("place-card__like-icon_liked")) {
      this.handleCardRequest(`like/${this._card.id}`, "DELETE")
        .then((res) => this._setLikeCount(res.likes.length))
        .catch((err) => console.log(err));
    } else {
      this.handleCardRequest(`like/${this._card.id}`, "PUT")
        .then((res) => this._setLikeCount(res.likes.length))
        .catch((err) => console.log(err));
    }

    likeIcon.classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    if (confirm("Вы действительно хотите удалить эту карточку?")) {
      this.removeListeners();

      this.handleCardRequest(this._card.id, "DELETE").catch((err) =>
        console.log(err)
      );

      this._card.remove();
      this._card = null;
    }
  }

  removeListeners() {
    this._card
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);
    this._card
      .querySelector(".place-card__delete-icon")
      .removeEventListener("click", this.remove);
    this._card
      .querySelector(".place-card__image")
      .removeEventListener("click", this.imagePopup);
  }

  _setLikeCount(count) {
    this._card.querySelector(".place-card__like-count").textContent = count;
  }
}
