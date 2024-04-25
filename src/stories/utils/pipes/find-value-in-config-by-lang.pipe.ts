import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'findValueInConfigByLang',
})
export class FindValueInConfigByLangPipe implements PipeTransform {
	transform(value: any): string {
		const text: string =
			localStorage.getItem(value) ??
			'text not found in findValueInConfigByLangPipe';

		return text;
	}
}
