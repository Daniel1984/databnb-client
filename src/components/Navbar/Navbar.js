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
        <Link class={styles.link} href={backTo}>
          <div class={styles.title}>{title}</div>
        </Link>
      </div>

      <div class={styles.rightCta}>
        {children}
      </div>
    </div>
  );
}
