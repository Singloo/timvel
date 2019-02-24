const { of } = require('rxjs');
const { map, delay, startWith } = require('rxjs/operators');
of(1)
  .pipe(
    delay(3000),
    map(_ => {
      console.warn('aaa');
      return 22;
    }),
    startWith(1),
  )
  .subscribe({
    next: x => console.warn(x),
    complete: _ => console.warn('ccc'),
  });
