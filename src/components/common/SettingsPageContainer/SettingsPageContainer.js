import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './SettingsPageContainer.scss';
import LeftArrowIcon from '../../../assets/icons/left-arrow.svg';

export default function SettingsPageContainer({ backTo = '/', title, children }) {
  return (
    <div class={styles.root}>
      <Link href={backTo}>
        <img class={styles.backIcon} src={LeftArrowIcon} />
      </Link>
      <div class={styles.title}>{title}</div>
      {children}
    </div>
  );
}
