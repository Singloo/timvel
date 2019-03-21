import AV from 'leancloud-storage';
import { invoke } from './helper';
import { $CENTER, $TYPES } from './$observable';
import { retry3, HANDLE } from './$helper';
const dispatch = (type, payload = {}) => ({ type, payload });
class UUer {
  constructor() {
    this.user = null;
  }
  init = async callback => {
    try {
      if (this.user) {
        return this.user;
      }
      const user = await AV.User.currentAsync();
      if (!user) {
        return null;
      }
      this.user = await user.fetch();
      invoke(callback)();
      $CENTER.next(dispatch($TYPES.userMount));
      return this.user;
    } catch (error) {
      console.warn('user init error', error);
      return null;
    }
  };
  get = attribute => {
    if (!this.user) {
      return null;
    }
    return this.user.get(attribute);
  };
  retryTimes = (func, times = 2) => {
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
  set = async (key, value) => {
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
  increment = async (key, value) => {
    if (!this.user) {
      return null;
    }
    this.user.increment(key, value);
    return this.user.save();
  };
  userCoin = () => {
    return this.get('userCoin');
  };
  isLoggedIn = () => {
    return !!this.user;
  };
  logIn = async ({ username, password }) => {
    await AV.User.logIn(username, password);
    this.init();
  };
  signUp = async ({ username, email, password }) => {
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
  username = () => {
    return this.get('username');
  };
  email = () => {
    return this.get('email');
  };
  objectId = () => {
    return this.get('objectId');
  };
  userCoin = () => {
    return this.get('userCoin');
  };
  id = () => {
    return this.objectId();
  };
  avatar = () => {
    return this.get('avatar');
  };
  updateAvatar = url => {
    this.set('avatar', url);
  };
  logOut = () => {
    AV.User.logOut();
    this.user = null;
    $CENTER.next(dispatch($TYPES.userUnmount));
  };
  increaseCoin = num => {
    return this.increment('userCoin', num);
  };
  ableToBuy = amount => {
    if (!this.user) {
      console.warn('No user');
      return false;
    }
    return this.userCoin() >= parseInt(amount);
  };
}
const User = new UUer();
export default User;
