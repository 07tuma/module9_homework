/* 
* Задание 4.

Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. 
В input можно ввести любое число. При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.

Подсказка: получение данных из input.

const value = document.querySelector('input').value;
*/

const result = document.querySelector('.output');

const btn = document.querySelector('.btn');


btn.addEventListener('click', () => {
    const width = +document.querySelector('.input-width').value;
    const height = +document.querySelector('.input-height').value;

    if (height < 100 || height > 300 || width < 100 || width > 300) {
        result.innerHTML = "<p>Одно из чисел вне диапазона от 100 до 300</p>";
    } else {
        fetch(`https://picsum.photos/${width}/${height}`)

        .then((response) => {
            result.innerHTML = `
            <div class="card">
                <img src="${response.url}">
            </div>`;
        })
        .catch(() => {console.log('error')});
    }

})