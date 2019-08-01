import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable()

export class ConfigService {


  private SERVER_URL = 'https://localhost:8000';

  constructor(private http: HttpClient) 
  { }

  
}
