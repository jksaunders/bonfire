const goTo = (url) => {
  if (url && typeof window !== 'undefined') {
    window.location.href = url;
  }
};

export default {
  goTo
};