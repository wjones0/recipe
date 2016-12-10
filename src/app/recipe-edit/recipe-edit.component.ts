import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe = {
    title: "Title of R",
    yield: "40ish",
    time: "16hrs",
    image: "https://s3.amazonaws.com/pp-test-img/tuna-c.png",
    ingredients: [
      "one thousand peppercorns",
      "two million basil leaves",
      "three eggs",
    ],
    steps: [
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam pariatur enim cupiditate perferendis cumque labore itaque aperiam quisquam nobis dolor consectetur modi ipsum voluptatibus architecto, reiciendis. Magnam aperiam, voluptate hic.",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In eius laudantium consequuntur at ducimus ratione, incidunt delectus sint mollitia quod excepturi magnam sit iste necessitatibus! Commodi amet illum, ratione quibusdam.",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore quibusdam ducimus ab sed quo sint aspernatur quod in quaerat culpa. Sequi, ipsa nostrum! Deserunt doloribus, cum ipsum inventore omnis molestiae!",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus quisquam quia quis molestiae distinctio veniam necessitatibus nulla animi expedita assumenda delectus, rem adipisci eaque ducimus nam, perferendis iusto. Minus, sed."
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}
