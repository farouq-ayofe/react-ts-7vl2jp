import * as React from 'react';

import { generateSliderMarks } from './getSliderMarks';
import { MOCK_DATA } from './constant';
import { omit } from 'lodash';

export const useSliderFilter = () => {
  const [currentFilter, setCurrentFilter] = React.useState({
    male: 0,
    female: 50,
  });

  const sliderOptions = React.useMemo(() => {
    // get all age group keys
    const keys = (MOCK_DATA || []).map((d) => Object.keys(d)).flat();

    // remove duplicate and "_time"
    const uniqueKeys = [...new Set(keys)].filter((el) => el !== '_time');

    console.log(uniqueKeys, 'uniqueKeys');

    // generate slider options
    return generateSliderMarks(uniqueKeys);
  }, []);

  console.log(sliderOptions, 'sliderOptions');

  const filteredData = React.useMemo(() => {
    // get the age group value e.g "10 - 29"
    const selectedMaleAgeGroup = sliderOptions.find(
      (option) => option.value === currentFilter.male
    )?.label;

    const selectedFemaleAgeGroup = sliderOptions.find(
      (option) => option.value === currentFilter.female
    )?.label;

    console.log(selectedMaleAgeGroup, 'selectedMaleAgeGroup');
    console.log(selectedFemaleAgeGroup, 'selectedFemaleAgeGroup');

    const finalData = MOCK_DATA.map((data) => {
      // get gender value fro this particular time frame from the selected age-group
      const maleValue = data[selectedMaleAgeGroup]?.male;
      const femaleValue = data[selectedMaleAgeGroup]?.female;

      return {
        _time: data._time,
        maleAgeGroup: selectedMaleAgeGroup,
        femaleAgeGroup: selectedFemaleAgeGroup,
        male: maleValue,
        female: femaleValue,
        percentage: Math.max(maleValue, femaleValue),
      };
    });

    return finalData;
  }, []);

  console.log(filteredData, 'filteredData');

  return null;
};
