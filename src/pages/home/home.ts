import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users;
  childData: any = [];

  constructor(public navCtrl: NavController, private http: HttpClient, private sqlite: SQLite) {

    this.initiateDB();


  }


  initiateDB() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {


        db.executeSql('create table IF NOT EXISTS users( id int NOT NULL PRIMARY KEY, name VARCHAR(32), email VARCHAR(32))', [])
          .then(() => {
            console.log('Executed SQL');
            this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((response) => {
              console.log(response);
              this.users = response;
              this.insertDB();
            });

          })
          .catch(e => console.log(e));


      })
      .catch(e => console.log(e));
  }


  insertDB() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        let query = "INSERT INTO users (id, name, email ) VALUES ";

        this.users.forEach(element => {
          query = query + "('" + element.id + "', '" + element.name + "','" + element.email + "'),";
        });

        console.log(query.substring(0, query.length - 1));
        db.executeSql(query.substring(0, query.length - 1), [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));


      })
      .catch(e => console.log(e));
  }


  getData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql("SELECT * FROM users", [])
          .then((res) => {
            console.log('Executed SQL ' + res)

            this.childData = []
            for (var i = 0; i < res.rows.length; i++) {
              this.childData.push({ name: res.rows.item(i).name, email: res.rows.item(i).email });
            }
            console.log(this.childData);
          })
          .catch(e => console.log(e));


      })
      .catch(e => console.log(e));
  }

}
