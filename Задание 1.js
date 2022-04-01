/*
* Задание 2

Вам дана заготовка и результат, который вы должны получить. 
Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.
*/

const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
       <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const parser = new DOMParser();

const xmlDOM = parser.parseFromString(xmlString, 'text/xml');

const studentNode = xmlDOM.querySelectorAll('student');

let result = {
  list: []
};

for (let i = 0; i < studentNode.length; i++) {
  firstName = studentNode[i].querySelector('first').textContent;
  secondName = studentNode[i].querySelector('second').textContent;
  age = studentNode[i].querySelector('age').textContent;
  prof = studentNode[i].querySelector('prof').textContent;
  lang = studentNode[i].querySelector('name').getAttribute('lang');

  let student = {
    name: `${firstName} ${secondName}`,
    age: age,
    prof: prof,
    lang: lang,
  }

  result.list.push(student);  
}

console.log(result)