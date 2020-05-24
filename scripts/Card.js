/*
Card
Это класс, создающий карточку. Добавьте ему методы constructor, like и remove.
И ещё один — create. Он будет создавать DOM-элемент карточки.
 */

class Card {
  like(event) {
    if (event.target.classList.contains("place-card__like-icon")) {
      event.target.classList.toggle("place-card__like-icon_liked");
    }
  }

  remove(event) {
    if (event.target.classList.contains("place-card__delete-icon")) {
      event.currentTarget.removeChild(event.target.parentNode.parentNode);
    }
  }



  create(data) {
    return `
      <div class="place-card">
        <div
          class="place-card__image"
          style="background-image: url(${data.placeLink})"
        >
        <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">${data.placeName}</h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>
    `;
  }

  renderDOM(array) {
    return array.map(item => this.create(item));
  }
}

/*
const like = (event) => {
  if (event.target.classList.contains("place-card__like-icon")) {
    return event.target.classList.toggle("place-card__like-icon_liked");
  }
  return false;
};

const deleteImage = (event) => {
  if (event.target.classList.contains("place-card__delete-icon")) {
    return event.currentTarget.removeChild(event.target.parentNode.parentNode);
  }
  return false;
};

const addImageStyle = (event) => {
  const popupImage = document.querySelector(".popup__image");

  popupImage.style = event.target.attributes.style.value;
};
*/

