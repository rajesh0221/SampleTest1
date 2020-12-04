import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
 @Input() status: string;
 @Output() newItemEvent = new EventEmitter<boolean>();
 textval:string;
  constructor(private service: EmployeeService,private router:Router,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    if(this.status){
this.textval="Update Employee"
    }
    else{
      this.textval="Register Employee"
    }
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      fullName: '',
      position: '',
      empCode: '',
      mobile: '',
      username:'',
      password:'',
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
    {
      this.firestore.collection('employees').add(data);
       this.router.navigateByUrl('');
    }
    else
    {
      this.firestore.doc('employees/' + form.value.id).update(data);
     this.router.navigateByUrl('/user');
     this.newItemEvent.emit(false);
    }
     this.resetForm(form);
    this.toastr.success('Submitted successfully', 'EMP. Register');
   
  }

}
