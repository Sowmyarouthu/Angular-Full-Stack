import { ArrayType } from "@angular/compiler/src/output/output_ast";

export class Car {
  _id?: string;
  modelname?: string;
  year?: number;
  power?: number;
  color?: string;
  category?:ArrayType;
  make?: string;
}
