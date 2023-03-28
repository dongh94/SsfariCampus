import styles from './LPBtn.module.css';

const LPBtn = (props) => {
  const classes = styles.LPBtn + ' ' + props.className;

  return (
    <button className={classes} onClick={props.onClick}>{props.children}</button>
  );
};

export default LPBtn;