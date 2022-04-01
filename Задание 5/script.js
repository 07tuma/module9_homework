/* 
* Задание 5.

Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
*/

const result = document.querySelector('.output');

const btn = document.querySelector('.btn');

let data = localStorage.getItem('savedInfo');

function displayResult(data) {
    let cards = "";
    if (data) {
        data.forEach((item) => {
            const cardBlock = `
            <div class="card">
                <img src="${item.download_url}" class="card-image">
            </div>`;
            cards += cardBlock;
        });
        result.innerHTML = cards;
    }
}

btn.addEventListener('click', () => {
    const inputNumber = +document.querySelector('.input-number').value;
    const inputLimit = +document.querySelector('.input-limit').value;

    if (!(Number.isInteger(inputNumber)) && !(Number.isInteger(inputLimit))) {
        result.innerHTML = "<p>Номер страницы и лимит вне диапазона от 1 до 10 либо не являются целыми числами</p>";
     } else if ((inputNumber < 1 || inputNumber > 10) && (inputLimit < 1 || inputLimit > 10)) {
        result.innerHTML = "<p>Номер страницы и лимит вне диапазона от 1 до 10</p>";
    } else if ( !(Number.isInteger(inputNumber)) || (inputNumber < 1 || inputNumber > 10)) {
                   result.innerHTML = "<p>Номер страницы вне диапазона от 1 до 10 либо не является целым числом</p>";
        } else if (!(Number.isInteger(inputLimit)) || (inputLimit < 1 || inputLimit > 10)) {
                            result.innerHTML = "<p>Лимит вне диапазона от 1 до 10 либо не является целым числом</p>";
            } else {
                fetch(`https://picsum.photos/v2/list?page=${inputNumber}&limit=${inputLimit}`)

                    .then((response) => {
                        return response.json();
                    })

                    .then((data) => {
                        localStorage.setItem('savedInfo', JSON.stringify(data));
                        displayResult(data);
                                        })

                    .catch(() => { console.log('error') });
            }
       })

displayResult(JSON.parse(data));