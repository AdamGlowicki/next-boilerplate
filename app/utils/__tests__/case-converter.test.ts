import {
  camelCase,
  snakeCase,
} from 'change-case';

import { caseConverter } from '@/utils/case-converter';

describe('case-converter.ts - converting data to specified case', () => {
  it('is converting keys to snake_case', () => {
    const snakeCased = caseConverter({
      camelCaseField: 'testing-convert',
      customField: 'customValue',
    }, snakeCase);

    expect(snakeCased).toEqual(expect.objectContaining({
      camel_case_field: 'testing-convert',
      custom_field: 'customValue',
    }));
  });

  it('is converting keys to camelCase', () => {
    const camelCased = caseConverter({
      additionalField: 'testing',
      custom_fields: 'testing_converting',
      snake_case_field: 'testingTwice',
    }, camelCase);

    expect(camelCased).toEqual(expect.objectContaining({
      customFields: 'testing_converting',
      snakeCaseField: 'testingTwice',
    }));
  });

  it('is converting nested keys of object', () => {
    const camelCased = caseConverter({
      custom_fields: {
        nested_field: 'test_value',
        second_field: 'test',
      },
    }, camelCase);

    expect(camelCased).toEqual(expect.objectContaining({
      customFields: {
        nestedField: 'test_value',
        secondField: 'test',
      },
    }));
  });

  it('is converting array items', () => {
    const camelCased = caseConverter([
      {
        custom_fields: {
          nested_field: 'test_value',
          second_field: 'test',
        },
      },
      {
        second_obj: 'converted_or_not',
      },
      {
        thirdObject: 'testing',
      },
    ], camelCase);

    expect(camelCased).toEqual(expect.arrayContaining([
      {
        customFields: {
          nestedField: 'test_value',
          secondField: 'test',
        },
      },
      {
        thirdObject: 'testing',
      },
    ]));
  });

  it('is converting array items (excluding primitives)', () => {
    const camelCased = caseConverter([
      1,
      'test',
      false,
      {
        custom_fields: {
          nested_field: 'test_value',
          second_field: 'test',
        },
      },
      {
        second_obj: 'converted_or_not',
      },
      {
        thirdObject: 'testing',
      },
    ], camelCase);

    expect(camelCased).toEqual(expect.arrayContaining([
      1,
      'test',
      false,
      {
        customFields: {
          nestedField: 'test_value',
          secondField: 'test',
        },
      },
      {
        thirdObject: 'testing',
      },
    ]));
  });

  it('is converting form data', () => {
    const snakeCased = new FormData();

    snakeCased.append('first_field', 'test_value');
    snakeCased.append('second_field', 'test');

    const camelCased = caseConverter(snakeCased, camelCase) as FormData;

    expect(camelCased.get('firstField')).toEqual('test_value');
    expect(camelCased.get('secondField')).toEqual('test');
  });
});
