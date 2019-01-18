import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'searcher_pipe'
})

export class SearcherPipe implements PipeTransform {
  transform(items: any, query?: any): any {
		if (!items || !query) {
			return [];
		}
		return items.filter(item => item.tags.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
	}
}