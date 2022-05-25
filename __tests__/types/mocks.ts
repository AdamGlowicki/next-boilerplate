import { AxiosStatic } from 'axios';
import MockAdapter from 'axios-mock-adapter/types';

export type CustomAxios = AxiosStatic & MockAdapter;
