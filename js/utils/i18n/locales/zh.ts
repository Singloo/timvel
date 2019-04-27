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
  signUpErrorEmailInvalid: '电子邮箱地址无效???',
  signUpErrorUserIdInvalid: '无效的用户 Id，可能用户不存在无效???',
  signUpErrorUsernameInvalid:
    '角色名称非法，角色名称只能以英文字母、数字或下划线组成。',
  signUpErrorUsernameOccupied: '用户名已经被占用了...?',
  signUpErrorEmailOccupied: '邮箱已经被注册...',
  welcome: '欢迎',
  placeholder: '说点什么吧...',
  happenedAt: '发生于:',
  tags: '标签',
  daily: '日常',
  popular: '时下热门',
  current: '当前',
  noInterested: '不感兴趣?',
  searchSomething: '搜索......',
  confirm: '可以',
  cancel: '算了',
  add: '添加',
  welcomeAfterLogin: '欢迎回来,我已等候多时',
  afterTravel: '欢迎来到',
  noMoreData: '没有更多了... 关于你?',
  loginTitle: '我们又见面了',
  signUpTitle: '加入我们',
  isNew: '新人?',
  haveAnAccount: '已有账号?',
};
const normal = {
  networkError: '请求失败了... 可能是网络不好',
};
const user = {
  noEnoughCoin: '可惜呢... 没有足够的金币',
  avatarUpdaed: '头像更新成功~',
};
const createNew = {
  atLeastOnePic: '最少需要一张图片,选择一张随机的图片吗?',
  atMost8Pics: '最多只能选择8张图片',
  spend2CoinChooseARandom: '花费 2 个金币,选择一张随机的图片',
  today: '现在',
  weather: '天气',
};
const shopPage = {
  unknownProductType: '未知的商品类型, 无法进行下一步..',
  niceDeal: '交易成功~~',
  shop: '商店',
  saveImageSuccess: '图片保存成功了, 在你的相册里',
  introAvatar: '这张图片将替换你的头像',
  introDrawLots: '抽奖, 随机一个人获得商品',
  introSticker: '保存一张图片到你的相册, 要好好使用',
  introOneTime: '一次性的照片, 只可以看一次, 关闭后需要再次购买',
  introTitle: '购买一个称号, 将在你名字前展示',
  introDrawTitle: '获得一个随机的称号',
  goingToBuy: '你即将购买的是',
  purchase: '购买',
};
const strangerPage = {
  chooseGift: '送点什么好呢?',
  giftWillCostsYou: '这将花费你',
};
const profilePage = {
  openPhotoAlbum: '打开相册',
  openCamera: '打开相机',
  changeAvatar: '更换头像',
};
const publishProduct = {
  publishProduct: '发布商品',
  title: '标题',
  price: '价格',
  priceFormatWrong: '价格必须是数字哦',
  productType: '商品种类',
  customizeTitle: '自定义你的称号(最多8个字符)',
  description: '简介',
  mandatory: '必须',
  optional: '可选',
  cover: '封面',
  productAvatar: '头像',
  productSticker: '表情包',
  productTitle: '称号',
};
const postReplies = {
  replies: '回复我的',
  readAll: '已读',
  noReplies: '还没有人回复过你...',
};
const notifPage = {};
export default {
  ...loginPage,
  ...createNew,
  ...shopPage,
  ...user,
  ...normal,
  ...strangerPage,
  ...profilePage,
  ...publishProduct,
  ...postReplies,
  ...notifPage,
};
