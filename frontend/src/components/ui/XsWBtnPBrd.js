import styles from './XsWBtnPBrd.module.css';
const XsWBtnPBrd = (props) => {

  const classes = styles.XsWBtnPBrd + ' ' + props.className;

  return (
    <button className={classes} onClick={props.onClick}>{props.children}</button>
  );
};

export default XsWBtnPBrd;