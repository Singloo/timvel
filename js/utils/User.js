import AV from 'leancloud-storage';
import { invoke } from './helper';
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
    await this.user.save();
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
    this.increment(num);
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

// export function isLoggedIn() {
//   return !!AV.User.current();
// }

// export function logIn({ username, password }) {
//   return AV.User.logIn(username, password);
// }

// export function signUp({ username, email, password }) {
//   const user = new AV.User();
//   user.setUsername(username);
//   user.setEmail(email);
//   user.setPassword(password);
//   return user.signUp();
// }

// export function changeUsername(username) {
//   return AV.User.current().save({
//     username,
//   });
// }

// export function logOut() {
//   console.warn('logout');
//   AV.User.logOut();
// }

// export function current() {
//   return AV.User.current();
// }
// export function currentAsync() {
//   return AV.User.currentAsync();
// }
// export function username() {
//   return AV.User.current().get('username');
// }

// export function getUserInfo() {
//   let user = AV.User.current();
//   var userInfo = {
//     userId: user.get('userId'),
//     username: user.get('username'),
//     userCoin: user.get('userCoin'),
//     userAvatar: user.get('avatar'),
//     objectId: user.get('objectId'),
//     email: user.get('email'),
//     phoneNumber: user.get('mobilePhoneNumber'),
//     organization: user.get('organization'),
//   };

//   return userInfo;
// }

// export function id() {
//   const user = AV.User.current();
//   if (!user) {
//     return null;
//   }
//   const userId = user.get('userId');
//   return userId;
// }

// export function getUserByObjectId(objectId) {
//   const query = new AV.Query('_User');

//   return query.get(objectId);
// }

// export async function updateAvatar(url) {
//   try {
//     const user = await AV.User.currentAsync();
//     if (!user) {
//       return;
//     }
//     user.set('avatar', url);
//     await user.save();
//   } catch (error) {
//     console.warn(error.message);
//     throw error;
//   }
// }
