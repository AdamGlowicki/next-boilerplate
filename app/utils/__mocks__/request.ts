export default jest.mock('@/utils/request', () => ({
  __esModule: true,
  request: {
    post: (_url: string, _params: { [key: string]: string }) => new Promise(resolve => {
      resolve({
        data: {
          access: 'new-access',
        },
      });
    }),
  },
}));
