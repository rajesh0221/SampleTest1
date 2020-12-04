import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  list: Employee[];
  constructor(private service: EmployeeService,private router:Router,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
      this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      })
    });
      console.log(this.list)
  }

  onSubmit(form?:NgForm){
    let a=this.list.filter(data=>data.username===form.username&& data.password===form.password).length>0;
     console.log(a)
    if(a===true){
 this.router.navigateByUrl('/user');
  this.toastr.success('Login successfully');
    }
    else{
this.toastr.error('Login Failed');
    }
    
  }

}
