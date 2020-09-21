import { Pipe, PipeTransform } from '@angular/core';
import { CandidateModel } from 'src/app/Core/Models/candidateModel';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  static forRoot() {
    return {
        ngModule: FilterPipe,
        providers: [],
    };
 }
  transform(items: CandidateModel[], filter: CandidateModel): CandidateModel[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: CandidateModel) => this.applyFilter(item, filter));
  }

  applyFilter(candidate: CandidateModel, filter: CandidateModel): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (CandidateModel[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (CandidateModel[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
