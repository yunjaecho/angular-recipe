import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'swearingfiler'})
export class SwearingPipe implements PipeTransform {

  _bad_words = [
    'popp',
    'crap',
    'damn',
    'butt'
  ];

  transform(value: string, repl: string = '(oh dear)'): any {
    for (const bad_word of this._bad_words) {
      value = value.replace(bad_word, repl);
    }

    return value;
  }

}
