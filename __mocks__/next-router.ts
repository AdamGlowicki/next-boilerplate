import * as mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

jest.mock('next/router', () => mockRouter);
jest.mock('next/dist/client/router', () => mockRouter);
jest.spyOn(mockRouter.default, 'back');

export default mockRouter.default;

