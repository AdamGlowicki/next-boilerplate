import MockAdapter from 'axios-mock-adapter';
import assignIn from 'lodash.assignin';
import { AxiosStatic } from 'axios';

// Main idea taken from: https://github.com/ctimmerm/axios-mock-adapter/issues/58#issuecomment-720549592
// cannot require axios, otherwise it recursively mocks
const axios: AxiosStatic = jest.requireActual('axios');
const mockAxios = new MockAdapter(axios);

export default assignIn(axios, mockAxios);
