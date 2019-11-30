import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export const formatDisplayedTimePipe = (
  property: string,
  resultPropertyName: string = 'displayedTime',
) =>
  pipe(
    map((data) =>
      Array.isArray(data)
        ? formatDisplayedTimePipeFromArray(data, property, resultPropertyName)
        : formatDisplayedTimePipeFromObject(data, property, resultPropertyName),
    ),
  );

const formatDisplayedTimePipeFromArray = (
  array,
  property: string,
  resultPropertyName: string = 'displayedTime',
) => {
  if (array.length === 0) { return array; }

  return array.map((element) => formatDisplayedTimePipeFromObject(element, property, resultPropertyName));
};

const formatDisplayedTimePipeFromObject = (
  object,
  property: string,
  resultPropertyName: string = 'displayedTime',
) => {

  return Object.defineProperty(object, resultPropertyName, {
    value: moment(object.Date).format('dddd'),
    configurable: true,
    enumerable: true,
    writable: true,
  });
};
