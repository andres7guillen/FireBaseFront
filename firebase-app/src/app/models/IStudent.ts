export interface IStudent {
  id?: string;
  name: string;
  lastName: string;
  phone: string;
  age: number;
  email: string;
  address: string;
  university: string;
  semester: string;
  time: string;
  gender: string;
}

export class Student implements IStudent {
  id?: string;
  name: string;
  lastName: string;
  phone: string;
  age: number;
  email: string;
  address: string;
  university: string;
  semester: string;
  time: string;
  gender: string;

  constructor(data: IStudent) {
    this.id = data.id;
    this.name = data.name;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.age = data.age;
    this.email = data.email;
    this.address = data.address;
    this.university = data.university;
    this.semester = data.semester;
    this.time = data.time;
    this.gender = data.gender;
  }
}