export const setIntersctionObserver = (targetEl, onIntersect, options) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        onIntersect(el);
        observer.unobserve(el);
      }
    });
  }, options);
  io.observe(targetEl);
};
