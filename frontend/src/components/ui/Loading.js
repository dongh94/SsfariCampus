import styles from "./Loading.module.css";
import { Ring } from "@uiball/loaders";

const Loading = (props) => {
  const classes = styles.Loading + " " + props.className;
  const Ring_color =
    props.role === 'USER' ? <Ring size={90} lineWeight={7} speed={1.5} color={'#5d33e6'}/> : <Ring size={90} lineWeight={7} speed={1.5} color={'#000000'}/>;
  return (
    <div className={classes}>
      {Ring_color}
    </div>
  );
};

export default Loading;
