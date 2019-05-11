import AV from 'leancloud-storage';
import { invoke } from './helper';
import { $CENTER, $TYPES } from './$observable';
import DeviceInfo from 'react-native-device-info';
import { retry3, $retryDelay } from './$helper';
import { apiClient } from './httpClient';
import { Platform } from 'react-native';
const dispatch = (type: string, payload = {}) => ({ type, payload });
class UUer {
  user?: AV.User;
  installationId?: string;
  constructor() {}
  init = async (callback?: () => void) => {
    try {
      if (this.user) {
        return this.user;
      }
      const user = await AV.User.currentAsync();
      if (!user) {
        return null;
      }
      this.user = user;
      invoke(callback!)();
      $CENTER.next(dispatch($TYPES.userMount));
      user
        .fetch()
        .then(_user => (this.user = user))
        .catch(() => {});
      this.setInstallationId(this.installationId);
      return this.user;
    } catch (error) {
      console.warn('user init error', error);
      return null;
    }
  };
  get = (attribute: string) => {
    if (!this.user) {
      return null;
    }
    return this.user.get(attribute);
  };
  retryTimes = (func: () => any, times = 2) => {
    let triedTimes = 0;
    const result = func();
    if (triedTimes >= times) {
      return result;
    }
    if (result) {
      return result;
    }
    triedTimes = triedTimes + 1;
    this.init(this.retryTimes(func, triedTimes));
  };
  set = async (key: string, value: any) => {
    try {
      if (!this.user) {
        return null;
      }
      await this.user.save({
        [key]: value,
      });
    } catch (error) {
      console.warn('set error', key, error);
    }
  };
  increment = async (key: string, value?: number) => {
    if (!this.user) {
      return null;
    }
    this.user.increment(key, value);
    const user = await this.user.save();
    this.user = user;
    return user;
  };
  logIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await AV.User.logIn(username, password);
    this.init();
  };
  signUp = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    console.warn(username, email, password);
    const user = new AV.User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    this.user = await user.signUp();
    this.init();
    $CENTER.next(dispatch($TYPES.userMount));
    return this.user;
  };
  get userCoin() {
    return this.get('userCoin');
  }
  get isLoggedIn() {
    return !!this.user;
  }
  get username() {
    return this.get('username');
  }
  get email() {
    return this.get('email');
  }
  get objectId() {
    return this.get('objectId');
  }
  get avatar() {
    return this.get('avatar');
  }
  get uniqueId() {
    return DeviceInfo.getUniqueID();
  }
  get appVersion() {
    return DeviceInfo.getVersion();
  }
  updateAvatar = (url: string) => {
    return this.set('avatar', url);
  };
  logOut = () => {
    AV.User.logOut();
    this.user = undefined;
    $CENTER.next(dispatch($TYPES.userUnmount));
  };
  increaseCoin = (num?: number) => {
    return this.increment('userCoin', num);
  };
  ableToBuy = async (amount: number | string) => {
    if (!this.isLoggedIn) {
      console.warn('No user');
      return false;
    }
    const user = await AV.User.currentAsync();
    this.user = user;
    return user.get('userCoin') >= parseInt(amount as string);
  };
  setInstallationId = (installationId?: string) => {
    if (!this.isLoggedIn || !installationId) {
      this.installationId = installationId;
      return;
    }
    retry3(
      apiClient.post('/user/save_installation', {
        token: installationId,
        user_object_id: this.objectId,
        platform: Platform.OS,
      }),
    ).subscribe({
      next: () => {
        this.installationId = undefined;
      },
      error: err => {
        console.warn(err);
      },
    });
  };
}
const User = new UUer();
export default User;
