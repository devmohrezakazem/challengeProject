import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: 'auth',
});


const authState = atom({
  key: 'auth',
  default: {
    api_key:'bfb597de645924b6af6eed909c659eaf',
    request_token: '',
    account_id :''
  },
  effects_UNSTABLE: [persistAtom],
});

export default authState;