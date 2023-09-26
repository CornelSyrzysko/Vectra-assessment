import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { LoaderComponent } from './loader.component';
import { ComponentPortal } from '@angular/cdk/portal';


@Injectable({
  providedIn: 'root',
})
export class LoaderService { // This service is to control when the loader displays or doesn't

  // It's better to use a global service, where the service can check whether the loader is
  // displaying or not, to prevent loader instances from being stacked.

  // Because the data is stored locally, the loader will probably never get shown.

  loaderVisible: boolean = false;

  private overlayRef: OverlayRef = this.overlay.create({
    positionStrategy:
      this.overlay.position()
                  .global()
                  .centerHorizontally()
                  .centerVertically(),
    hasBackdrop: true,
    backdropClass: 'vec-backdrop'
  })

  constructor(private overlay: Overlay,) { }

  public showLoader() {
    if (!this.loaderVisible) {
      this.overlayRef.attach(new ComponentPortal(LoaderComponent));
      this.loaderVisible = true;
    }
  }

  public hideLoader() {
    if (this.loaderVisible) {
      this.overlayRef.detach();
      this.loaderVisible = false;
    }
  }
}
