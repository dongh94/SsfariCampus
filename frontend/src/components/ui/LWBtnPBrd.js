import styles from './LWBtnPBrd.module.css';

const LWBtnPBrd = (props) => {
  const classes = styles.LWBtnPBrd + ' ' + props.className;

  return (
    <button className={classes} onClick={props.onClick}>{props.children}</button>
  );
};

export default LWBtnPBrd;