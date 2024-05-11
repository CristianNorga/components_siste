import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-carousel-dot',
	templateUrl: './carousel-dot.component.html',
	styleUrls: ['./carousel-dot.component.scss'],
	standalone: true,
	imports: [CommonModule],
})
export class CarouselDotComponent {
	index: number = 0;
	name: string = '';

	@Input()
	set dotSelected(value: number) {
		this.selected = this.index === value;
	}

	@Output() arrange = new EventEmitter();

	selected: boolean = false;

	constructor() {}

	select() {
		this.arrange.emit({ index: this.index, name: this.name });
	}
}
