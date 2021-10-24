import { setIntersctionObserver } from './intersectionObserverUtils.js';

export const lazyLoadImage = (imgEl) => {
  setIntersctionObserver(
    imgEl,
    (img) => {
      img.classList.remove('lazy');
      img.src = img.dataset.src;
    },
    { threshold: 0.1 }
  );
};
