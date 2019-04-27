const loginPage = {
  login: 'Login',
  signUp: 'Sign up!!!',
  loginUsername: 'username',
  loginPassword: 'password',
  signUpUsername: 'your username',
  signUpPassword: 'your password',
  signUpEmail: 'your email',
  usernameEmpty: `Username can't be empty`,
  passwordEmpty: `Password can't be empty`,
  emailEmpty: `Email is invalid...`,
  signUpErrorDefault: 'Failed.. try again?',
  signUpErrorEmailInvalid: 'Email is invalid',
  signUpErrorUserIdInvalid: 'User id is invalid ???',
  signUpErrorUsernameInvalid:
    'Username is invalid,allow number, letter, underline',
  signUpErrorUsernameOccupied: 'Username is occupied..',
  signUpErrorEmailOccupied: 'Email is already used..',
  welcome: 'Welcome to ...',
  placeholder: 'Say something before ...',
  happenedAt: 'At:',
  tags: 'Tags',
  daily: 'daily',
  popular: 'Popular',
  current: 'Current',
  noInterested: 'No Interested?',
  searchSomething: 'Search something ...',
  confirm: 'Confirm',
  cancel: 'Cancel',
  add: 'Add',
  welcomeAfterLogin: 'I’ve been waiting for a lont time',
  afterTravel: 'Welcome to',
  noMoreData: 'No more posts to show you... ',
  loginTitle: 'See you again',
  signUpTitle: 'Join us',
  isNew: 'New?',
  haveAnAccount: 'Have an account?',
};
const normal = {
  networkError: 'Network error... ',
};
const user = {
  noEnoughCoin: 'No enough coin...',
  avatarUpdaed: 'Avatar update succeeds',
};
const createNew = {
  atLeastOnePic: 'You need to upload at least one picture, take a random one?',
  atMost8Pics: 'Only able to select at most 8 pictures',
  spend2CoinChooseARandom: 'Choose a random picture, this will cost you 2 coin',
  today: 'today',
  weather: 'weather',
};
const shopPage = {
  unknownProductType: 'Unknown product type...',
  niceDeal: 'Nice deal',
  shop: 'Shop',
  saveImageSuccess: 'Save image succeeds',
  introAvatar: 'Use this picture as your avatar',
  introDrawLots: 'A random buyer will get this product',
  introSticker: 'Save a sticker to your photo album',
  introOneTime: 'See the picture, but it is a one-time',
  introTitle: 'Buy a title, it shows in front of your username',
  introDrawTitle: 'Get a random title',
  goingToBuy: 'You are going to buy',
  purchase: 'Purchase',
};
const strangerPage = {
  chooseGift: 'Choose a gift to send',
  giftWillCostsYou: 'This will cost you',
};
const profilePage = {
  openPhotoAlbum: 'Open photo album',
  openCamera: 'Open camera',
  changeAvatar: 'Change avatar',
};
const publishProduct = {
  publishProduct: 'Publish product',
  title: 'Title',
  price: 'Price',
  priceFormatWrong: 'Price should be digital',
  productType: 'Product type',
  customizeTitle: 'Customize your title (at most 8 letters)',
  description: 'Description',
  mandatory: 'mandatory',
  optional: 'optional',
  cover: 'Cover',
  productAvatar: 'Avatar',
  productSticker: 'Sticker',
  productTitle: 'Title',
  productOneTime: 'One-time picture',
};
const postReplies = {
  replies: 'Replies',
  readAll: 'Read all',
  noReplies: 'No replies',
};
const notifPage = {};
const setting = {
  logout: 'Log out',
  checkVerison: 'Check new version',
  areYouSureToLogout: 'Are you sure to log out?',
  seeYouAgain: 'Looking forward to see you again',
  noNewVersion: 'Current version is latest',
  foundNewVersion: 'I found a new version~~ Pls download it',
  download: 'download',
  saveToClipboard:
    'Saved url to your clipboard, paste it into browser to download',
  oneTimeWarn: 'If you close this page, you need to buy it again',
};
const homePage = {
  inProgress: 'In progress 🚧.....',
};
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
  ...setting,
  ...homePage,
};
