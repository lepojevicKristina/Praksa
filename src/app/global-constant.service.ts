import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class GlobalConstantService {

  readonly SERVER_URL: string = 'http://praksa.local';

  constructor() { }
}
