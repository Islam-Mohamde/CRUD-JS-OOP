
// Select Element
const formEmp = document.getElementById('formEmp');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputMobile = document.getElementById('mobile');
const tableBody = document.querySelector('.main');
const submit = document.getElementById('submit');
const contIdEdit = document.getElementById('contIdEdit');


class Employee {
    constructor(id,name,email,mobile) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }

    showData() {

        Employee.showHtml(this.id,this.name,this.email,this.mobile);
        return this; // chining to showdata don't return undefine
    }

// store data in local storage
    storeEmployee() {

        const allData = JSON.parse(localStorage.getItem('employess')) ?? [];

        allData.push({
            id: this.id,
            name: this.name,
            email: this.email,
            mobile: this.mobile
        });

        localStorage.setItem('employess', JSON.stringify(allData));
    }

// loop data to shaw data in table when reloade 
    static showAllEmployees() {

        if(localStorage.getItem('employess')) {

            JSON.parse(localStorage.getItem('employess')).forEach((item) => {

                Employee.showHtml(item.id,item.name,item.email,item.mobile);

            })
        }
    }

// update element
updateEmployee(id){

    const newItem = {id:id,name:this.name,email:this.email,mobile:this.mobile,}

    const updateData = JSON.parse(localStorage.getItem('employess')).map((item) => {

        if(item.id == id){

            return newItem; 
        }

        return item;
    });

    localStorage.setItem('employess', JSON.stringify(updateData));
}


// create tr and show data in the table
    static showHtml(id,name,email,mobile) {

        const trElement = document.createElement('tr');

        trElement.innerHTML = `
                            <tr role='row' class="odd">
                            <td>${name}</td>
                            <td>${email}</td>
                            <td>${mobile}</td>
                            <td>
                                <button class="btn btn-info edit" data-id="${id}">Edit</button>
                                <button class="btn btn-danger delete" data-id='${id}'>Delete</button>
                            </td>
                        </tr>`

        tableBody.appendChild(trElement);
    }
}

Employee.showAllEmployees();

formEmp.addEventListener('submit', (e) => {
    
    e.preventDefault();

    if(!contIdEdit.value){

// get random number for id 
    let id = Math.floor(Math.random() * 1000000);
// new object from class
    const newEmp = new Employee(id,inputName.value,inputEmail.value,inputMobile.value);
// run fun
    newEmp.showData().storeEmployee(); // chining 

} else {

    const id = contIdEdit.value;

    const newEmp = new Employee(id,inputName.value,inputEmail.value,inputMobile.value);

    newEmp.updateEmployee(id);

    submit.value = 'Store This Data';

    tableBody.innerHTML = '';

    Employee.showAllEmployees();
}

// input empty
    inputName.value = '';
    inputEmail.value = '';
    inputMobile.value = '';

});

tableBody.addEventListener('click', (e) => {
// delete the element
    if(e.target.classList.contains('delete')) {

// remove from local storage
    let id = e.target.getAttribute('data-id');
// convert json to object and filter item
    let emps = JSON.parse(localStorage.getItem('employess'));

    let newData = emps.filter(item => item.id != id);

    localStorage.setItem('employess', JSON.stringify(newData));

    console.log(newData)

// remove from html
        e.target.parentElement.parentElement.remove();
    }

// edit the element
if(e.target.classList.contains('edit')) {

    let id = +e.target.getAttribute('data-id');

    let item = JSON.parse(localStorage.getItem('employess')).find(item => item.id == id);

    inputName.value = item.name;
    inputMobile.value = item.mobile;
    inputEmail.value = item.email;
    submit.value = 'Edit This Item';
    contIdEdit.value = id;
    }
});
 