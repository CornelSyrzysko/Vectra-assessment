import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  // service to handle all local storage events. If the local storage was expected to
  // handle sensitive data, an encryption library could be used to encrypt and decrypt
  // the data.

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    let data = localStorage.getItem(key)|| "";
    return data;
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

}
