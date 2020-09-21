import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  techList = [
    { id: 1, name: 'Python' },
    { id: 2, name: 'Node Js' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'PHP' },
    { id: 5, name: 'Django' },
    { id: 6, name: 'Angular' },
    { id: 7, name: 'Vue' },
    { id: 8, name: 'ReactJs' },
  ];

  gradeList = [
    { id: 1, name: 'A+' },
    { id: 2, name: 'A' },
    { id: 3, name: 'A-' },
    { id: 4, name: 'B+' },
    { id: 5, name: 'B' },
    { id: 6, name: 'B-' }
  ];
  
  floorList = [
    { id: 0, name: 'Ground Floor' },
    { id: 1, name: 'First Floor' },
    { id: 2, name: 'Second Floor' },
    { id: 3, name: 'Third Floor' }
  ];

  markings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  displayItemsPerPage = [
    10,20,50,100
  ]

  filterTec(tec) {
    return this.techList.filter(x => x.name === tec);
  }

  category = [
    { id: 1, name: 'Web' },
    {id: 2, name: 'Windows'}
  ]
  // pracStatus = practicalStatusEnum;
  // status = Object.keys(this.pracStatus).map(key => ({value: this.pracStatus[key]}));
  status = [
    { id: 0, name: 'Not Assign' },
    { id: 1, name: 'In Progress' },
    { id: 2, name: 'Under Evaluation' },
    { id: 3, name: 'Completed' },
  ];

  constructor() { }
}

export enum practicalStatusEnum{
  Not_Assign = 0,
  InProgress,
  Under_Evaluation,
  Completed
}

export enum fileType{
  PracticaDocument = 1,
  ReferenceDocument 
}
