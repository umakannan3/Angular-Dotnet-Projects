import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './service/employeeService';
import { Employee } from './model/employee';
import { provideHttpClient } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('angularcrud');
  employees = signal<Employee[]>([]);
  empForm !: FormGroup;
  constructor(private empService: EmployeeService, private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadEmployees();

  }

  loadEmployees(): void {
    this.empService.getEmployeeList().subscribe({
      next: (data: Employee[]) => {
        this.employees.set(data);
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  initializeForm(): void {
    this.empForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      emailID: ['', Validators.required]
    })
  }

  deleteEmployee(id: string): void {
    console.log("Delete employee with id:", id);
    this.empService.deleteEmployee(id).subscribe({
      next: () => {
        console.log("Employee deleted successfully");
        this.loadEmployees();
      }
    })
    // Implement delete functionality here
  }

  editEmployee(emp: Employee): void {
    console.log(emp)
    console.log("Edit employee with id:", emp);
    // Implement edit functionality here
    this.empForm.setValue(
      {
        id: emp.id,
        name: emp.name,
        mobileNo: emp.mobileNo,
        emailID: emp.emailID
      }
    )
    this.empService.ediEmployee(this.empForm.value).subscribe({
      next : (data) =>{
        console.log("Employee edited successfully", data);
        this.loadEmployees();
        // this.empForm.reset();
      }
    })
    // this.empService.ediEmployee()
  }

  OnSubmit(): void {
    console.log(this.empForm.value);
    this.empService.createEmployee(this.empForm.value).subscribe(data => {
      console.log("Employee created successfully", data);
      this.loadEmployees();
      this.empForm.reset();
    })
  }

}
