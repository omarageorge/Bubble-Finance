import style from './Avator.module.scss';

const Avator = ({ url }) => {
  return <img id={style.frame} src={url} />;
};

export default Avator;
