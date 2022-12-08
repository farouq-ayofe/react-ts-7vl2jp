import isEmpty from 'lodash/isEmpty';

const MAX_VALUE = 100;

const compareCollator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

export const generateSliderMarks = (options: string[]) => {
  if (isEmpty(options) || !Array.isArray(options)) return [];

  const uniqueAndTruthyOptions = options
    .filter((item, index, ar) => Boolean(item) && ar.indexOf(item) === index)
    .sort((a, b) => compareCollator.compare(a, b));

  const base = Math.ceil(MAX_VALUE / (uniqueAndTruthyOptions.length - 1));

  return uniqueAndTruthyOptions.map((item, index, arr) => {
    const value = index === 0 ? 0 : index * base;
    const isLast = index === arr.length - 1;

    return {
      // always give the last item a value of 100
      value: isLast ? MAX_VALUE : value,
      label: `${item}`,
    };
  });
};
