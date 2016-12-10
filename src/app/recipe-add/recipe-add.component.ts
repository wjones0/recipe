import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  recipe = {
    title: "",
    yield: "",
    time: "",
    image: "",
    ingredients: [],
    steps: []
  }

  constructor() { }

  ngOnInit() {
  }

}
