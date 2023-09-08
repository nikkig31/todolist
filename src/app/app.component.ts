import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo';
  add!: any;
  storetodo: {task:string, toCheck:boolean} []=[];
  added() {
    if (!this.add) {
      Swal.fire({
        icon: 'error',
        title: 'Avoid blank addition',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.storetodo.push({task:this.add, toCheck:false});
      localStorage.setItem('tododata', JSON.stringify(this.storetodo));
      this.gettodo();
      Swal.fire({
        icon: 'success',
        title: 'Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      this.add = '';
    }
  }

  temp:any=[];
  gettodo() {
    if (localStorage.getItem('tododata')) {

      this.temp = localStorage.getItem('tododata');
      this.storetodo = JSON.parse(this.temp);
      console.log(this.storetodo);
    } else {
      this.storetodo = [];
    }
  }

  index(id:number){
    this.storetodo[id].toCheck=!this.storetodo[id].toCheck;
  }

  edit(id: number) {
    Swal.fire({
      title: 'Edit list detail',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if (login) {
          console.log(login);
          // this.storetodo.splice(id, 1, login);
          this.storetodo[id].task=login;          
          localStorage.setItem('tododata', JSON.stringify(this.storetodo));
          this.gettodo();
        } else {
          Swal.showValidationMessage(`Invalid Updation`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {});
  }

  dlt(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        this.storetodo.splice(id, 1);
        localStorage.setItem('tododata', JSON.stringify(this.storetodo));
      }
    });
  }
  
}
