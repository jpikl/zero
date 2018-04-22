export function debounce(timeout, callback) {
  let id = null;

  return () => {
    clearTimeout(id);
    id = setTimeout(callback, timeout);
  };
}
