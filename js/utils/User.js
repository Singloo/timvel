import AV from 'leancloud-storage';

export function init() {
  AV.init({
    appId: 'UYganDzaND6XsvYaL552tlbs-gzGzoHsz',
    appKey: 'l5ld3QxRSvLCaJ4Rpv6gXbIq',
  });
}

export function isLoggedIn() {
  return !!AV.User.current();
}

export function logIn({ username, password }) {
  return AV.User.logIn(username, password);
}

export function signUp({ username, email, password }) {
  const user = new AV.User();
  user.setUsername(username);
  user.setEmail(email);
  user.setPassword(password);
  return user.signUp();
}

export function changeUsername(username) {
  return AV.User.current().save({
    username,
  });
}

export function logOut() {
  AV.User.logOut();
}

export function current() {
  return AV.User.current();
}

export function username() {
  return AV.User.current().get('username');
}

export function getUserInfo() {
  let user = AV.User.current();
  var userInfo = {
    username: user.get('username'),
    userCoin: user.get('userCoin'),
    userAvatar: user.get('avatar'),
    userTitle: user.get('title'),
    objectId: user.get('objectId'),
    email: user.get('email'),
    phoneNumber: user.get('mobilePhoneNumber'),
    organization: user.get('organization'),
  };

  return userInfo;
}

export function updateAvatar(url) {
  return AV.User.current().save({
    avatar: url,
  });
}
