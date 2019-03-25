import AV from 'leancloud-storage';
import { invoke } from './helper';
import { $CENTER, $TYPES } from './$observable';
const dispatch = (type: string, payload = {}) => ({ type, payload });
class UUer {
  user?: AV.User;
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
    return this.user.save();
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
  updateAvatar = (url: string) => {
    this.set('avatar', url);
  };
  logOut = () => {
    AV.User.logOut();
    this.user = undefined;
    $CENTER.next(dispatch($TYPES.userUnmount));
  };
  increaseCoin = (num?: number) => {
    return this.increment('userCoin', num);
  };
  ableToBuy = (amount: number | string) => {
    if (!this.user) {
      console.warn('No user');
      return false;
    }
    return this.userCoin() >= parseInt(amount as string);
  };
}
const User = new UUer();
export default User;
