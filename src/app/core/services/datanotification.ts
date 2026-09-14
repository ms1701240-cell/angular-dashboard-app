import { Injectable, signal } from '@angular/core';
export interface AppNotification {
  id: number;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class Datanotification {
  
notifactions=signal<AppNotification[]>([])

addnotification(title:string,message:string){
  const newnotify:AppNotification={
      id: Date.now(),
      title: title,
      message: message,
      date: new Date().toLocaleTimeString(),
      isRead: false
  };
  this.notifactions.update((list)=>[newnotify,...list])
}
getunreadnotification(){
  return this.notifactions().filter(n=>!n.isRead).length
}
cleranotification(){
  return this.notifactions.update(list=>list.map(n=>({...n,isRead:true})))
}
}
