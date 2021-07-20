﻿//#region Angular, Material, RxJS
import { Component, Input } from '@angular/core';
//#endregion

//#region App Component, Model, Service
import { LoaderService } from '@app/_shared/loader/loader.service';
//#endregion

/**
 * Email Field Component
 * TODO - Comment
 *  @param formToModify - the formGroup to add the fields on
 */
@Component({
  selector: 'app-submit-button',
  templateUrl: 'submit-button.component.html' })
export class SubmitButtonComponent {

  @Input() text:string = "Bonjour";

  get isLoading() { return this.loaderService.loading;}

  constructor(private loaderService: LoaderService) { }
}