import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';

const cameraPosition = {
	environment: 'environment',
	user: 'user'
};
/* 
	dictionary value.
	DBConfig_co > catalogTexts > 📄 deviceType: "CHATBOT"

	- dictionaryStoreId as bss_person_store_id
*/

@Component({
	selector: 'app-camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnDestroy {
	@ViewChild('video') video!: ElementRef;
	@ViewChild('canvas') canvas!: ElementRef;

	@Input() typeImage = '';
	@Input() storeId = '';

  @Output() eventSendPhoto = new EventEmitter();
  @Output() cameraError = new EventEmitter();
  @Output() closeCamera = new EventEmitter();
  @Output() modalClose = new EventEmitter();

  browser = <any>navigator;
  cameraOn = true;
  loading = true;
  errorMessage: any;
  showError = false;
	loadingPicture = false;
	showErrorCamera = false;
	errorRed = '';
	cameraPosition: any;
	isMobile = false;
	photoSize = { width: 635, height: 480 };

	constructor() {
		this.cameraPosition = cameraPosition.environment;
	}

	public ngAfterViewInit() {
		this.cameraPosition = this.validateDevice();

		this.initCamera({
			video: {
				facingMode: this.cameraPosition,
			},
			audio: false,
		});

    this.canvas.nativeElement.width = this.photoSize.width;
    this.canvas.nativeElement.height = this.photoSize.height;
	}

	private initCamera(config: any) {
		this.browser.getUserMedia =
			this.browser.getUserMedia ||
			this.browser.webkitGetUserMedia ||
			this.browser.mozGetUserMedia ||
			this.browser.msGetUserMedia;

		if (this.browser.mediaDevices && this.browser.mediaDevices.getUserMedia) {
			this.browser.mediaDevices.getUserMedia(config).then(
				(stream: any) => {
					this.showErrorCamera = false;
					this.video.nativeElement.srcObject = stream;
					this.video.nativeElement.play().then(() => {
						window.dispatchEvent(new Event('resize'));
						this.loading = false;
					});
				},
				(error: any) => {
					this.showErrorCamera = true;
					this.eventSendPhoto.emit(false);
					this.cameraError.emit(error);
				}
			);
		} else {
			this.cameraError.emit(true);
		}
	}

	definePosition() {
		this.close();
		this.cameraPosition =
			this.cameraPosition === cameraPosition.user
				? cameraPosition.environment
				: cameraPosition.user;
		this.initCamera({ video: { facingMode: this.cameraPosition }, audio: false });
	}

	public capture() {
		this.cameraOn = false;
    this.video.nativeElement.pause();

		this.canvas.nativeElement
			.getContext('2d')
			.drawImage(
				this.video.nativeElement,
				0,
				0,
        this.photoSize.width,
        this.photoSize.height
			);
	}

	private dataURLtoFile(dataurl: any) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) u8arr[n] = bstr.charCodeAt(n);
		return new File([u8arr], 'filename', { type: mime });
	}

	public again() {
		this.cameraOn = true;
    this.video.nativeElement.play().then(() => {
      window.dispatchEvent(new Event('resize'));
    });
	}

	savePhotoUser() {
		this.loadingPicture = true;
		this.errorRed = 'false';
    const data = this.canvas.nativeElement.toDataURL('image/png');

		const file = this.dataURLtoFile(data);
		this.eventSendPhoto.emit(file);
		this.close();
	}

	close() {
		this.closeCamera.emit(true);
		if (this.video && this.video.nativeElement.srcObject) {
			this.video.nativeElement.srcObject.getTracks()[0].stop();
		}
	}

	closeError() {
		this.loadingPicture = false;
		this.close();
	}

	ngOnDestroy() {
		this.close();
	}

	closeModal() {
		this.modalClose.emit(true);
	}

  validateDevice() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const dictionaryStoreId = '5e7cfb39ead1af0edcfb1241';

    if (this.storeId === '' || dictionaryStoreId !== this.storeId) {
      return cameraPosition.environment;
    }

    if (isMobile) {
      return cameraPosition.user;
    }

    return cameraPosition.environment;
  }
}
