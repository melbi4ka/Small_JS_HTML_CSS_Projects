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
        // console.log(data);
        resultHeading.innerHTML = `<h2>Search results for ${term}:</h2>`;
        let allMeals = data.meals;
        // console.log(allMeals);

        if (allMeals !== null) {
          mealsEl.innerHTML = allMeals
            .forEach((meal) => {
              const div = onCreateElement('div', ['meal'], mealsEl);
              console.log(div);
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
      .catch(console.log('Error'));
  } else {
    alert('Please enter a  search term');
  }

  search.value = '';
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
