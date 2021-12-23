import s from './HomePageHeading.module.css';

export default function HomePageHeading({ text }) {
  return <h1 className={s.title}>{text}</h1>;
}
