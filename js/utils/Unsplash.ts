//@ts-ignore
import Unsplash, { toJson } from 'unsplash-js/native';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
const unsplash = new Unsplash({
  applicationId:
    'fa621889114ce2e1240f267f0b2648a33a8806c5d61e5e9c0625cc1922ce1539',
  secret: '791e6474d0c8835799b755d981a53372d10cce54a533a639cacad80a5e9e112d',
  callbackUrl: '{CALLBACK_URL}',
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  'public',
  'read_user',
  'write_user',
  'read_photos',
  'write_photos',
]);

const getRandomPhoto = async () => {
  const result = await unsplash.photos.getRandomPhoto();
  return toJson(result);
};
// from(unsplash.photos.getRandomPhoto()).pipe(map(toJson));

export { getRandomPhoto };
