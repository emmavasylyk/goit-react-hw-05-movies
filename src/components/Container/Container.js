import PropTypes from 'prop-types';
import s from './Container';
export default function Container({ children }) {
  return <div className={s.container}>{children}</div>;
}
Container.protoTypes = {
  children: PropTypes.string,
};
