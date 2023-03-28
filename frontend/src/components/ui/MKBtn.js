import styles from './MKBtn.module.css';

const MKBtn = (props) => {
  const classes = styles.MKBtn + ' ' + props.className;

  return (
    <button className={classes} onClick={props.onClick}>{props.children}</button>
  );
};

export default MKBtn;