import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const errorToast = (message) => {
  return toast.error(`${message}`, {
    className: 'error-message',
    progressClassName: 'progress-bar',
  });
};

export const successToast = (message) => {
  return toast.success(`${message}`, {
    className: 'success-message',
    progressClassName: 'progress-bar',
  });
};
