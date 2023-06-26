const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.querySelector('#meals'),
  resultHeading = document.getElementById('result-heading'),
  singleMealEl = document.getElementById('single-meal');

//Search meal and fetch from API
function searchMeal(event) {
  event.preventDefault();

  //Clear single meal
  singleMealEl.innerHTML = '';
  mealsEl.innerHTML = '';

  //Get search term
  const term = search.value;

  //   Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for ${term}:</h2>`;
        let allMeals = data.meals;

        if (allMeals !== null) {
          mealsEl.innerHTML = allMeals
            .forEach((meal) => {
              const div = onCreateElement('div', ['meal'], mealsEl);
              onCreateElement('img', '', div, '', {
                src: `${meal.strMealThumb}`,
                alt: `${meal.strMeal}`,
              });
              const innerDiv = onCreateElement('div', ['meal-info'], div, '', {
                id: `${meal.idMeal}`,
              });
              onCreateElement('h3', '', innerDiv, `${meal.strMeal}`);
            })
            .join('');
        } else {
          resultHeading.innerHTML = `<p>There are no sesrch results.Try again!</p>`;
        }
      })
      .catch((error) => (allMeals = data.meals));
  } else {
    alert('Please enter a  search term');
  }

  search.value = '';
}

//Fetch meal by ID
async function getMealById(mealID) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  let data = await response.json();
  const meal = data.meals[0];

  addMealToDom(meal);
}

//Fetch random meal from API

async function getRandomMeal() {
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  let data = await response.json();
  const meal = data.meals[0];

  addMealToDom(meal);
}

// Add meal to DOM
function addMealToDom(meal) {
  singleMealEl.innerHTML = '';
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  let mealDiv = onCreateElement('div', ['single-meal'], singleMealEl);
  onCreateElement('h1', '', mealDiv, `${meal.strMeal}`);
  onCreateElement('img', '', mealDiv, '', {
    src: meal.strMealThumb,
    alt: meal.strMeal,
  });
  const infoDiv = onCreateElement('div', ['single-meal-info'], mealDiv, ``);
  onCreateElement('p', '', infoDiv, `${meal.strCategory}`);
  onCreateElement('div', '', infoDiv, `${meal.strArea}`);
  const instructionDiv = onCreateElement('div', ['main'], mealDiv);
  onCreateElement('p', '', instructionDiv, `${meal.strInstructions}`);
  onCreateElement('h2', '', instructionDiv, 'Ingredients');
  let ingredientsUl = onCreateElement('ul', '', instructionDiv);
  ingredients.forEach((el) => onCreateElement('li', '', ingredientsUl, el));
}

function onCreateElement(type, classNameList, parentEl, textcont, others) {
  let newEl = document.createElement(type);
  if (type === 'input' && textcont !== '') {
    newEl.value = textcont;
  } else if (type !== 'input' && textcont !== '') {
    newEl.textContent = textcont;
  }
  if (classNameList != '') {
    newEl.classList.add(...classNameList);
  }

  if (others != '') {
    for (const el in others) {
      newEl.setAttribute(`${el}`, `${others[el]}`);
    }
  }

  parentEl.appendChild(newEl);
  return newEl;
}

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);
mealsEl.addEventListener('click', (e) => {
  const path = e.path || (e.composedPath && e.composedPath());
  const mealInfo = path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute('id');
    getMealById(mealId);
  }
});
