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
  var userInfo = {
    username: AV.User.current().get('username'),
    userCoin: AV.User.current().get('userCoin'),
    userAvatar: AV.User.current().get('avatar'),
    userTitle: AV.User.current().get('title'),
  };

  return userInfo;
}

export function updateAvatar(url) {
  return AV.User.current().save({
    avatar: url,
  });
}
