import AV from 'leancloud-storage';

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
  console.warn('logout');
  AV.User.logOut();
}

export function current() {
  return AV.User.current();
}
export function currentAsync() {
  return AV.User.currentAsync();
}
export function username() {
  return AV.User.current().get('username');
}

export function getUserInfo() {
  let user = AV.User.current();
  var userInfo = {
    userId: user.get('userId'),
    username: user.get('username'),
    userCoin: user.get('userCoin'),
    userAvatar: user.get('avatar'),
    objectId: user.get('objectId'),
    email: user.get('email'),
    phoneNumber: user.get('mobilePhoneNumber'),
    organization: user.get('organization'),
  };

  return userInfo;
}

export function id() {
  const user = AV.User.current();
  const userId = user.get('userId');
  return userId;
}

export function updateAvatar(url) {
  return AV.User.current().save({
    avatar: url,
  });
}
