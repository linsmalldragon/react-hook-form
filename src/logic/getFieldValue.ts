import type { Field } from '../types';
import isCheckBox from '../utils/isCheckBoxInput';
import isFileInput from '../utils/isFileInput';
import isMultipleSelect from '../utils/isMultipleSelect';
import isRadioInput from '../utils/isRadioInput';
import isUndefined from '../utils/isUndefined';

import getCheckboxValue from './getCheckboxValue';
import getFieldValueAs from './getFieldValueAs';
import getRadioValue from './getRadioValue';

export default function getFieldValue(_f: Field['_f']) {
  const ref = _f.ref;

  if (isFileInput(ref)) {
    return ref.files;
  }

  if (isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }

  if (isMultipleSelect(ref)) {
    return [...ref.selectedOptions].map(({ value }) => value);
  }

  if (isCheckBox(ref)) {
    return getCheckboxValue(_f.refs).value;
  }
  const dataJsonValue = ref?.getAttribute?.('data-json');
  const emptyToUndefinedValue = ref?.getAttribute?.('empty-to-undefined');
  let value;
  if (isUndefined(ref.value)) {
    value = _f.ref.value;
  } else if (dataJsonValue === 'true') {
    if (ref.value === '') {
      value = undefined;
    } else {
      value = JSON.parse(ref.value);
    }
  } else if (emptyToUndefinedValue === 'true' && ref.value === '') {
    value = undefined;
  } else {
    value = ref.value;
  }

  return getFieldValueAs(value, _f);
}
