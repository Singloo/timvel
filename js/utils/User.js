import AV from 'leancloud-storage';
import { invoke } from './helper';
import { $CENTER, $TYPES, dispatch } from './$observable';
import { retryDelay, HANDLE } from './$helper';
// import {} from './base'
// import { CoinTransactionAnimation } from '../components/CoinTransactionAnimation';
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
      this.user.set(key, value);
      await this.user.save();
    } catch (error) {
      console.warn('set error', key, error);
    }
  };
  increment = async (key, value) => {
    if (!this.user) {
      return null;
    }
    this.user.increment(key, value);
    retryDelay(this.user.save()).subscribe(
      HANDLE(null, error => {
        console.warn(error);
      }),
    );
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
    const user = new AV.User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    this.user = await user.signUp();
    this.init();
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
  };
  increaseCoin = num => {
    this.increment('userCoin', num);
  };
  ableToBuy = amount => {
    if (!this.user) {
      return false;
    }
    return this.userCoin() >= parseInt(amount);
  };
}
const User = new UUer();
export default User;
