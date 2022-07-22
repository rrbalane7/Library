// Trying out this ES6 Class Object
class Book{

    //@param - {title:string, author:string, numofPages:numberString, haveRead:String}
    constructor(title, author, numOfPages, haveRead){
        this.title = title
        this.author = author
        this.numOfPages = numOfPages
        this.haveRead = haveRead;
    }


}

//Global Variables
const addBtn = document.querySelector("#add-btn")
const closeBtn = document.querySelector("#close-btn")
const closeBtn2 = document.querySelector("#close-btn2")
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const numOfPage = document.querySelector("#numPage")
const read = document.querySelector("#read")
const form = document.querySelector("#my-form")
const updatePopUp = document.querySelector(".update-cont")
const okaybtn = document.querySelector(".okay-btn")
let currentUpdatingBook;
let library = []
let libElement;

//Function call thru listening to events
form.addEventListener("submit", addBook)
addBtn.addEventListener("click", popAddWindow)
closeBtn.addEventListener("click", popAddWindow)
closeBtn2.addEventListener("click", updatePopWindow)


function popAddWindow(){
    if (form.style.display === ""){
        form.style.display = "block";
    } else {
        form.style.display = "";      
    }

}

function addBook(e){
    e.preventDefault();
    const book = new Book(e.target.title.value,
        e.target.author.value,
        e.target.numPage.value,
        e.target.read.value
        );

    library.push(book);
       
    document.querySelector(".library-cont").innerHTML += `
    <div class="book">
        <h2>${library[library.length-1].title}</h2>
        <h3>${library[library.length-1].author}</h3>
        <p>${library[library.length-1].numOfPages} pages</p>
        <p>Status: ${library[library.length-1].haveRead}</p>
        <div class="buttons">
            <button class="update-btn" type="button"><img src="./Assets/book-open-regular-36.png" alt="update"></button>
            <button class="remove-btn" type="button"><img src="./Assets/trash-regular-36.png" alt="remove"></button>
        </div>
    </div>
    `;
    title.value = "";
    author.value = "";
    numOfPage.value = "";
    read.value = "";

   popAddWindow();
   
   const removeBtns = document.querySelectorAll(".remove-btn");
   const updateBtns = document.querySelectorAll(".update-btn");

   updateBtns.forEach(btn => btn.addEventListener("click", updatePopWindow));
   removeBtns.forEach(btn => btn.addEventListener("click", removeBook));
}


function removeBook(e){
    const libHtml = e.path[4];

    library.splice(Array.from(libHtml.children).indexOf(e.path[3]),1);

    const thisBook = e.path[3];
    thisBook.remove();
}

function updatePopWindow(e){
    if (updatePopUp.style.display === ""){
        updatePopUp.style.display = "flex";
        document.querySelector(".label-update").textContent = `Update Status: ${e.path[3].firstElementChild.innerText}`

        okaybtn.addEventListener("click", updateBook);
        const thisBook = e.path[3].children;
        currentUpdatingBook = thisBook[3];
    } else {
        updatePopUp.style.display = "";    
    }
    libElement = Array.from(e.path[4].children).indexOf(e.path[3]);

    
}

function updateBook(){
    const statusRead = document.querySelector("#update");
    currentUpdatingBook.innerText = `Status: ${statusRead.value}`;
    updatePopUp.style.display = "";
    library[libElement].haveRead = `${statusRead.value}`;
}


