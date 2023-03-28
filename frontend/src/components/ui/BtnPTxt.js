import styles from './BtnPTxt.module.css';

const BtnPTxt = (props) => {

  const classes = styles.BtnPTxt + ' ' + props.className;


  return (
    <button className={classes} onClick={props.onClick}>{props.children}</button>
  );
};

export default BtnPTxt;