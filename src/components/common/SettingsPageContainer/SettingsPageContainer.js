import { h } from 'preact';
import styles from './SettingsPageContainer.scss';

export default function SettingsPageContainer({ children }) {
  return (
    <div class={styles.root}>
      {children}
    </div>
  );
}
