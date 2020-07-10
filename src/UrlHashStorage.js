import {toBinary, fromBinary} from './binary';

export default class UrlHashStorage {

  get() {
    const hash = location.hash.substring(1);
    return hash ? fromBinary(atob(hash)) : null;
  }

  set(value) {
    const hash = value ? btoa(toBinary(value)) : '';
    history.replaceState(null, '', '#' + hash);
  }

}
