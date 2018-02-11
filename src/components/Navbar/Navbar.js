import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './Navbar.scss';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';

export default function SettingsPageContainer({ backTo, title, children }) {
  return (
    <div class={styles.root}>
      <div class={styles.leftCta}>
        <Link href={backTo}>
          <img class={styles.backIcon} src={LeftArrowIcon} />
        </Link>
      </div>

      <div class={styles.midSection}>
        <div class={styles.title}>{title}</div>
      </div>

      <div class={styles.rightCta}>
        {children}
      </div>
    </div>
  );
}
