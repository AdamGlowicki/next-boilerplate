import {
  camelCase,
  snakeCase,
} from 'change-case';

type CaseConvererPrimitive = string |
  number |
  boolean |
  undefined;

interface CaseConverterObject {
  [key: string]:
    CaseConvererPrimitive |
    Array<string | number | boolean | undefined | CaseConverterObject> |
    CaseConverterObject;
}

type CaseConverterArray = Array<
  CaseConvererPrimitive |
  CaseConverterObject |
  FormData |
  CaseConverterArray
>;

type CaseConverter =
  CaseConverterObject |
  CaseConverterArray |
  FormData |
  CaseConvererPrimitive;

type ToCase = typeof camelCase | typeof snakeCase;

export function caseConverter(obj: CaseConverter, toCase: ToCase): CaseConverter {
  if (
    typeof obj === 'string' ||
    typeof obj === 'number' ||
    typeof obj === 'boolean' ||
    obj === null ||
    obj === undefined
  ) {
    return obj;
  }

  if (typeof FormData !== 'undefined' && obj instanceof FormData) {
    const convertedFormData = new FormData();

    // eslint-disable-next-line no-restricted-syntax
    for (const [
      key,
      value,
    ] of obj.entries()) {
      convertedFormData.append(toCase(key), value);
    }

    return convertedFormData;
  }

  if (Array.isArray(obj)) {
    const convertedArray = obj.map(objElement => {
      if (typeof objElement === 'string' || typeof objElement === 'number' || typeof objElement === 'boolean') {
        return objElement;
      }

      return caseConverter(objElement, toCase);
    });

    return convertedArray;
  }

  const convertedObj: CaseConverterObject = Object.keys(obj as CaseConverterObject).reduce(
    (convertedAcc, key: string) => {
      const objValue = (obj as CaseConverterObject)[key];
      const parsedKey = toCase(key);

      return {
        ...convertedAcc,
        [parsedKey]: (typeof objValue === 'string' || typeof objValue === 'number' || typeof objValue === 'boolean') ?
          objValue :
          caseConverter(objValue, toCase),
      };
    },
    {}
  );

  return convertedObj;
}
