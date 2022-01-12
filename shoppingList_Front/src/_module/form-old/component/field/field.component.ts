//#region Angular, Material, NgRx
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
//#endregion

//#region Component, Model, Service
import { FormErrorService } from '@form/service/form-error.service';
//#endregion

/**
 * Field Component
 *
 * This component manage a Field based on 'FormControl' that has :
 *  - A Name (Technical Name that refer to the Control)
 *  - A Label (Displayed Name)
 *  - A List of Validators (Accessible from children)
 *  - Related Error Messages (Accessible from children)
 *
 * It attaches the FormControl to the provided input FormGroup
 *
 *  @param formMod - FormGroup to add the FormControl on
 *  @param ctrlName - FormControl Technical Name
 *    If a label is not provided, the Control name is used as label
 *  @param label - (Optional) - Label of the field
 *  @param required - (Optional) - Set 'required' validator on FormControl
 *    true by default
 *
 */
@Component({
  selector: 'app-field',
  template: ``,
})
export class FieldComponent implements OnInit {

  // Control
  private _ctrl!: FormControl;
  private _ctrlName!: string;
  private _validators: ValidatorFn[] = new Array();

  // Input
  @Input() formMod!: FormGroup;
  @Input() set ctrlName(value: string) {
    this._ctrlName = value;
    if (this.label == null) this.label = value;
  }
  @Input() label!: string;
  @Input() required: boolean = true;

  // Accessor
  get ctrl() { return this._ctrl;}
  get ctrlName() { return this._ctrlName; }
  get err() { return this.formErrorService; }
  protected get validators() { return this._validators }

  constructor(private formErrorService: FormErrorService) { }

  ngOnInit() {

    if(this.required === true) { this._validators.push(Validators.required); }

    this._ctrl = new FormControl('', this._validators)
    this.formMod.addControl(this.ctrlName, this._ctrl);
  }
}