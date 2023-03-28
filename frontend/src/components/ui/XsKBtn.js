import styles from './XsKBtn.module.css';
const XsKBtn = (props) => {
  const classes = styles.XsKBtn + ' ' + props.className;
  return (
    <button className={classes} onClick={props.onClick}>{props.children}</button>
  );
};

export default XsKBtn;