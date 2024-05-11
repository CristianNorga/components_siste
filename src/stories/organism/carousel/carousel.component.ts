import {
	Component,
	TemplateRef,
	ElementRef,
	Input,
	AfterViewInit,
	OnInit,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';


import { CarouselSlideComponent } from '../../molecules/carousel-slide/carousel-slide.component';
import { CarouselDotComponent } from '../../molecules/carousel-dot/carousel-dot.component';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	imports: [CommonModule, CarouselSlideComponent, CarouselDotComponent],
	standalone: true,
})
export class CarouselComponent implements AfterViewInit {
	@ViewChild('slides') slides!: ElementRef<any>;
	selected: number = 0;
	minHeight: number = 318;
	setInterval: any = null;
	slideLength: number = 0;
	carousel: {
		mode: string;
		slidemodified: number;
		slideSeleted: number;
		calcMaxHeihgt: number;
		slides: Array<{
			zIndex: number;
			opacity: number;
			xtrans: number;
			scale: number;
			ytrans: number;
			height: number;
			indexArray: number;
		}>;
	} = {
		mode: 'oneItem',
		slidemodified: 0,
		slideSeleted: 0,
		calcMaxHeihgt: 0,
		slides: [],
	};

	ngAfterViewInit() {
		this.slideLength = this.carousel.slides.length;
		this.arrange(1);
		this.createInterval();
	}

	createInterval() {
		this.setInterval = setInterval(() => {
			this.arrange(this.changeSlide());
		}, 4000);
	}

	changeSlide(operation: string = 'add') {
		switch (operation) {
			case 'add':
				this.selected =
					this.slideLength - 1 <= this.selected ? 0 : this.selected + 1;
				break;
			case 'subtract':
				this.selected =
					0 == this.selected ? this.slideLength - 1 : this.selected - 1;
				break;
		}
		return this.selected;
	}

	removeInterval() {
		clearInterval(this.setInterval);
	}

	_mod(n, m) {
		return ((n % m) + m) % m;
	}
	listBefore(centerIndex, half) {
		const before = [];
		for (let i = centerIndex - 1; before.length < half; i--) {
			before.push(this.carousel.slides[this._mod(i, this.carousel.slides.length)]);
		}
		return before;
	}
	listAfter(centerIndex, before) {
		const after = [];

		for (
			let i = centerIndex + 1;
			after.length < this.carousel.slides.length - before.length - 1;
			i++
		) {
			after.push(this.carousel.slides[this._mod(i, this.carousel.slides.length)]);
		}

		return after;
	}
	arrange(centerIndex) {
		const half = (this.carousel.slides.length - 1) / 2;

		const before = this.listBefore(centerIndex, half);

		const after = this.listAfter(centerIndex, before);

		this.stylizeCentering(centerIndex, before, after);

		this.stylizeOther(before, after);
	}

	get style() {
		return {
			height: this.minHeight + 'px',
		};
	}

	saveHight(index, height) {
		this.carousel.slides[index].height = height;
	}

	setScale(index, scale) {
		if (this.carousel.mode === 'normal') {
			scale = 1;
		}
		this.carousel.slides[index].scale = scale;
	}

	setOpacity(index, opacity) {
		switch (this.carousel.mode) {
			case 'oneItem':
				opacity = opacity != 1 ? 0 : 1;
				break;
			case 'normal':
				opacity = 1;
				break;
		}
		this.carousel.slides[index].opacity = opacity;
	}

	setXtrans(index, xtrans) {
		switch (this.carousel.mode) {
			case 'normal':
			case '3d':
				xtrans = xtrans - 50;
				break;
		}
		this.carousel.slides[index].xtrans = xtrans;
	}

	setZindex(index, zIndex) {
		this.carousel.slides[index].zIndex = zIndex;
	}

	stylizeCentering(centerIndex, before, after) {
		this.setXtrans(centerIndex, 0);
		this.setOpacity(centerIndex, 1);
		this.setScale(centerIndex, 1);
		this.setZindex(centerIndex, Math.max(before.length, after.length) + 1);

		this.carousel.slideSeleted = centerIndex;
		this.carousel.calcMaxHeihgt = this.carousel.slides[centerIndex].height;
	}

	stylizeOther(before, after) {
		[before, after].forEach((list, listIndex) => {
			let parentTrans = 0;
			let parentScale = 1;

			list.forEach((item, i) => {
				parentScale = 0.8 ** (i + 1);
				const absolute = 105 * parentScale * 1.125 + parentTrans;
				parentTrans = absolute;

				this.setScale(item.indexArray, parentScale);
				this.setOpacity(item.indexArray, Math.max(1 - 0.25 * (i / 2 + 1) ** 2, 0));
				this.setXtrans(item.indexArray, (listIndex == 0 ? -1 : 1) * absolute);
				this.setZindex(item.indexArray, Math.max(before.length, after.length) - i);

				if (this.carousel.mode != 'oneItem' && this.carousel.mode != '3d') {
					this.carousel.calcMaxHeihgt =
						this.carousel.slides[item.indexArray].height >
						this.carousel.calcMaxHeihgt
							? this.carousel.slides[item.indexArray].height
							: this.carousel.calcMaxHeihgt;
				}

				this.carousel.slidemodified = item.indexArray;
			});
		});
	}

	changeStylesSlides(indexSlide, dataNew) {
		this.carousel.slides[indexSlide] = {
			...this.carousel.slides[indexSlide],
			...dataNew,
		};
	}
}
