export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
import {showMessage} from 'react-native-flash-message';
import AppColors from './AppColors';

export const successMessage = (description = '', message = 'success') => {
  showMessage({
    message: message,
    description: description,
    type: 'success',
  });
};
export const errorMessage = (description = '', message = 'error') => {
  showMessage({
    message: message,
    description: description,
    type: 'danger',
    position:'top'
  });
};
const toastMessage = (description = '', message = 'Info', type = 'info') => {
  showMessage({
    message: message,
    description: description,
    type: type,
  });
};
const GlobalMethods = {toastMessage, errorMessage, successMessage};
export default GlobalMethods;