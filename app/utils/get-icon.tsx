import { BsArrowRight, BsCheckCircle, BsQuestionCircle, BsXCircle } from 'react-icons/bs';
import { STATUS_CLASS, STATUS_CLASS_DIVISOR } from './constants';

export const getStatusIcon = (status: number) => {
  switch (Math.floor(status / STATUS_CLASS_DIVISOR)) {
    case STATUS_CLASS.success:
      return <BsCheckCircle />;
    case STATUS_CLASS.redirect:
      return <BsArrowRight />;
    case STATUS_CLASS.clientError:
    case STATUS_CLASS.serverError:
    case STATUS_CLASS.error:
      return <BsXCircle />;
    default:
      return <BsQuestionCircle />;
  }
};
