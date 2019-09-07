import { IInteractor } from '../types';
import {} from '../../../store';
import {} from '../../../utils';
import { PostDetailStore } from '../stores';

class PostDetailInteractor implements IInteractor {
  constructor(public postDetail: PostDetailStore) {}
}

export { PostDetailInteractor };
