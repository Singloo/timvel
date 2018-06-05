const loginPage = {
  login: '登录',
  signUp: '加入我们!!!',
  loginUsername: '你的名字',
  loginPassword: '你的密码',
  signUpUsername: '输入你的名字',
  signUpPassword: '输入你的密码',
  signUpEmail: '你的邮箱',
  usernameEmpty: '用户名不可以为空!!',
  passwordEmpty: '密码不可以为空!!',
  emailEmpty: '你的邮箱似乎有点问题....',
  signUpErrorDefault: '啊?失败...再试一下?',
  signUpErrorEmailInvalid:'电子邮箱地址无效???',
  signUpErrorUserIdInvalid:'无效的用户 Id，可能用户不存在无效???',
  signUpErrorUsernameInvalid:'角色名称非法，角色名称只能以英文字母、数字或下划线组成。',
  signUpErrorUsernameOccupied:'用户名已经被占用了...?',
  signUpErrorEmailOccupied:'邮箱已经被注册...'

};

const homePage = {};

export default {
  ...loginPage,
  ...homePage,
};
