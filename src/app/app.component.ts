import { Component, OnInit,  } from '@angular/core';
import Swal from 'sweetalert2';
import { EmployeeService } from './employee.service';
import { ReactiveFormsModule,FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/core/constants.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employess:any;
  addEmployeeForm:any;
  submitted=false;
  constant:any;

  constructor(
    private employeeService:EmployeeService,
    private fb:FormBuilder
  ){
    this.constant = Constants
  }

  ngOnInit(): void {
    this.getAllEmpLists();

    this.addEmployeeForm = new FormGroup({
      firstname:new FormControl(''),
      lastname:new FormControl(''),
      email:new FormControl(''),
      role:new FormControl(''),
      phone:new FormControl(''),
      address:new FormControl('')
    })

    this.addEmployeeForm = this.fb.group({
      firstname:['',[Validators.required, Validators.maxLength(30), Validators.pattern(this.constant.NAME_REGEXP)]] 
    })
    
  }

  get f(){
    return this.addEmployeeForm.controls;
  }

  // get All employees lists
  getAllEmpLists(){
    this.employeeService.empList().subscribe(
      {
      next:
            (res:any)=>{
              this.employess = res;
            },
    
      });
  };



  // sweetalert for delete popup
  deletePopup(){
  Swal.fire({
    title: 'Are you sure?',
    text: "you want to delete employee?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm Delete!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

onSubmit(){}
}
