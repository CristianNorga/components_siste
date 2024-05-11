import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-carousel-slide',
	templateUrl: './carousel-slide.component.html',
	styleUrls: ['./carousel-slide.component.scss'],
	standalone: true,
	imports: [CommonModule],
})
export class CarouselSlideComponent implements OnInit {
	@Output() arrange = new EventEmitter<any>();
	@Input() slidemodified: number = 0;
	@Input() slides: Array<{
		zIndex: number;
		opacity: number;
		xtrans: number;
		scale: number;
		ytrans: number;
		indexArray: number;
		height: number;
	}>;

	index: number;

	constructor() {}

	centerSelf() {
		this.arrange.emit(this.index);
	}

	ngOnInit() {
		this.index = this.slides.length;
		this.slides.push({
			zIndex: 0,
			opacity: 1,
			xtrans: 0,
			scale: 1,
			ytrans: 0,
			indexArray: this.index,
			height: 0,
		});
	}

	get style() {
		return {
			transition: 'transform 0.5s, opacity 0.5s',
			transform: this.transform,
			'z-index': this.slides[this.index].zIndex,
			opacity: this.slides[this.index].opacity,
		};
	}

	get transform() {
		return `translate(${this.slides[this.index].xtrans}%, 0%)`;
	}
}
