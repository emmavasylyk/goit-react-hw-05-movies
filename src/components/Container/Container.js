import s from './Container';
export default function Container({ children }) {
  return <div className={s.container}>{children}</div>;
}
