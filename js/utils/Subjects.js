import { Subject, Observable, from } from 'rxjs';
import { bufferCount, mergeMap, map, retry, catchError } from 'rxjs/operators';
import Axios from 'axios';
export const events$ = new Subject();

events$
  .pipe(
    bufferCount(10),
    map(logs => (Array.isArray(logs) ? logs : [logs])),
    mergeMap(logs => from(uploadEvents(logs))),
    retry(3),
  )
  .subscribe({
    next: () => {},
    error: err => {
      console.warn('upload events error: ', err);
    },
  });

const uploadEvents = async logs => {
  try {
    //
  } catch (error) {
    throw error;
  }
};
