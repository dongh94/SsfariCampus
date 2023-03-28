import styles from './BtnKTxt.module.css';

const BtnKTxt = (props) => {
  const classes = styles.BtnKTxt + ' ' + props.className;

  return (
    <button className={classes} onClick={props.onClick}>{props.children}</button>
  );
};

export default BtnKTxt;