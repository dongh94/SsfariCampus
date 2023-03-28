import styles from './SWBtnPBrd.module.css';
const SWBtnPBrd = (props) => {
  const classes = styles.SWBtnPBrd + ' ' + props.className;
  return (
    <button className={classes} onClick={props.onClick}>{props.children}</button>
  );
};

export default SWBtnPBrd;