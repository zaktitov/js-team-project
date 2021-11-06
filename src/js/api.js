import NewApiService from './apiClass';
import { debounce } from 'lodash';

const attempt = new NewApiService();

attempt.fetchTrends();
attempt.fetchByKeyWord();
attempt.fetchFullInfo();
