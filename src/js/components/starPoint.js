const starImageSourceMap = {
  empty: "./src/images/icon_empty_star.png",
  half: "./src/images/icon_half_star.png",
  full: "./src/images/icon_star.png",
};

class StarPoint {
  constructor() {
    this.starContentElement = document.querySelector(".content-star");
    this.starBackgroundElement =
      this.starContentElement.querySelector(".star-background");
    this.starimages = this.starBackgroundElement.querySelectorAll("img");
    this.starPointResetButton =
      this.starContentElement.querySelector(".icon-remove-star");
    this.lockedStarPoint = false;
  }

  setup() {
    this.bindEvents();
  }

  lockStarPoint() {
    this.lockedStarPoint = true;
  }

  unlockStarPoint() {
    this.lockedStarPoint = false;
  }

  isLockedStarPoint() {
    return this.lockedStarPoint;
  }

  bindEvents() {
    this.starBackgroundElement.addEventListener("mousemove", (event) => {
      if (this.isLockedStarPoint()) {
        return;
      }
      const { target, offsetX: currentUserPoint } = event;
      const { point } = target.dataset;
      const starPointIndex = parseInt(point, 10) - 1;
      const [starimageClientRect] = target.getClientRects();
      const starImageWidth = starimageClientRect.width;
      const isOverHalf = starImageWidth / 2 < currentUserPoint;

      this.renderStarPointImages({
        drawableLimitIndex: starPointIndex,
        isOverHalf,
      });
    });

    this.starBackgroundElement.addEventListener("click", () =>
      this.lockStarPoint()
    );

    this.starPointResetButton.addEventListener("click", () => {
      this.unlockStarPoint();
      this.resetStarPointImages();
    });

    this.starBackgroundElement.addEventListener("mouseout", () => {
      !this.isLockedStarPoint() && this.resetStarPointImages();
    });
  }

  renderStarPointImages(payload = {}) {
    const { drawableLimitIndex = -1, isOverHalf = false } = payload;
    Array.prototype.forEach.call(this.starimages, (starimage, index) => {
      let imageSource =
        index < drawableLimitIndex
          ? starImageSourceMap.full
          : starImageSourceMap.empty;

      if (drawableLimitIndex === index) {
        imageSource = isOverHalf
          ? starImageSourceMap.full
          : starImageSourceMap.half;
      }
      starimage.src = imageSource;
    });
  }

  resetStarPointImages() {
    this.renderStarPointImages();
  }
}

export default StarPoint;
