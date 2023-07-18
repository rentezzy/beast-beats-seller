import { useGetMe } from "../../../store/hooks";

import styles from "../Profile.module.css";
import SettingsForm from "./SettingsForm";

const Settings = () => {
  const { small } = useGetMe();
  return (
    <div>
      <div className={styles.profile__settings}>
        <div className={styles.profile__settings__image}>
          <img src={small} alt="" />
        </div>
        <SettingsForm />
      </div>
      <hr />
    </div>
  );
};

export default Settings;
