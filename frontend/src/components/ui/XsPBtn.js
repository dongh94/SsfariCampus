import styles from './XsPBtn.module.css';
const XsPBtn = (props) => {
  const classes = styles.XsPBtn + ' ' + props.className;
  return (
    <button className={classes} onClick={props.onClick}>{props.children}</button>
  );
};

export default XsPBtn;