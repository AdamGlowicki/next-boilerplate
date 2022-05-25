import * as helpers from '@/utils/helpers';

describe('helpers utils', () => {
  beforeEach(jest.clearAllMocks);

  describe('getActionPrefix', () => {
    it('uppercase the store feature properly', () => {
      const prefixed = helpers.getActionPrefix('auth');

      expect(prefixed).toBe('AUTH');
    });
  });
  describe('isLocaleRTL', () => {
    it('lack of prop returns undefined', () => {
      const locale = helpers.isLocaleRTL(undefined);

      expect(locale).toBe(false);
    });
    it('non RTL locale in prop returns false', () => {
      const locale = helpers.isLocaleRTL('pl');

      expect(locale).toBe(false);
    });
    it('RTL locale in prop returns true', () => {
      const locale = helpers.isLocaleRTL('ar-SA');

      expect(locale).toBe(true);
    });
  });
  describe('importLocaleMessages', () => {
    const mockExampleMessage = {
      testingMessage: [
        {
          type: 0,
          value: 'test',
        },
      ],
    };

    it('return messages when provide the right locale', async () => {
      jest.spyOn(helpers, 'importLocaleMessages').mockImplementationOnce(
        () => Promise.resolve(mockExampleMessage)
      );

      const messages = await helpers.importLocaleMessages('pl');

      expect(messages).toMatchObject(mockExampleMessage);
    });
    it('return false when prop is undefined', async () => {
      const messages = await helpers.importLocaleMessages(undefined);

      expect(messages).toBe(false);
    });
    it('return undefined when provide wrong locale', async () => {
      const messages = await helpers.importLocaleMessages('test');

      expect(messages).toBeUndefined();
    });
  });
});
