import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly url = "http://localhost:3000";

  constructor() { 
    this.socket = io.io(this.url);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  disconect(eventName: string | null) {
    this.socket.off(eventName);
  } 
}
