import { Injectable } from '@angular/core';
import { CandidateModel } from 'src/app/Core/Models/candidateModel';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: CandidateModel[];

  private _connection: HubConnection;

  constructor() {
    this.startConnection();
    this.onCloseConnection();
  }

  public startConnection = () => {
    this._connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl('http://localhost:44354/notificationhub')
      //.withUrl('https://localhost:44348/progress')
      .build();
    console.log(this._connection);
 
    this._connection
      .start()
      .then(() => console.log('Connection started!!!!!!!!!!!!!!!!'))
      .catch(err => console.error('Error while establishing connection:!!!!!! ' + err));

    //this._connection.on('taskStarted', data => {
    //    console.log('task started');
    //    //this.started = data;
    //    console.log(data);
    //  });

    //this._connection.on('transferdata', data => {
    //    console.log(data);
    //    //this.started = data;
    //  });
  }

  public onCloseConnection() {
    // attempt to reconnect after every 5 seconds, after conenction gets timeout/close.
    this._connection.onclose(() => {
      setTimeout(() => {
        this._connection.start().then(() => {
          console.log("connection restarted");
        }).catch(err => console.log('connection error again : ' + err));
      }, 5000);
    });
  }

  public getSignalRConnection() {
    return this._connection || null;
  }
}
