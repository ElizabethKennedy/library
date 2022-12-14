const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookRead = document.getElementById("bookRead");
const addNewBookBtn = document.getElementById("newBookBtn");
const tBody = document.querySelector("tbody");
const bookTable = document.getElementById("bookTable");
const removeId = document.getElementById("removeBookId");
const removeBookButton = document.getElementById("removeBookBtn");





// Book Class
class Book {
  constructor(id, title, author, read) {
    (this.id = id),
      (this.title = title),
      (this.author = author),
      (this.read = read);
  }
}

// Library Class
class Library extends Book {
  constructor(id, title, author, read, bookCount = 0, books = []) {
    super(id, title, author, read);
    (this.bookCount = bookCount), (this.books = books);
  }

  // Mark book read method
  markRead(checkbox) {
    checkbox.addEventListener("change", () => {
      checkbox.checked = true;
      checkbox.disabled = true;
    });
  }

  addBook() {


    // Create a remove Button 'rBtn' for per book item
    let rBtn = document.createElement("button");
    rBtn.setAttribute("class", "btn-close");

    // insert a row into the table which is  <tr>
    let newCell = tBody.insertRow(-1);
    newCell.setAttribute('id', this.bookCount);

    // insert a cells which is <td> into the table
    let bookId = newCell.insertCell(0);
    let titleCell = newCell.insertCell(1);
    let authorCell = newCell.insertCell(2);
    let readCell = newCell.insertCell(3);

    // adding content inside of the table
    let book_title = document.createTextNode(bookTitle.value);
    let book_Author = document.createTextNode(bookAuthor.value);
    let book_Read = document.createElement("Input");
    book_Read.setAttribute("type", "checkbox");
    let book_Id = document.createTextNode(book.bookCount);

    // append the content inside the table
    titleCell.appendChild(book_title);
    authorCell.appendChild(book_Author);
    readCell.appendChild(book_Read);
    bookId.appendChild(book_Id);

    // Adding the values to the book array
    let newBook = new Book(
      this.bookCount,
      bookTitle.value,
      bookAuthor.value,
      book_Read
    );

    // Append the new row to the table body
    tBody.append(newCell);

    // Add new book to the books array
    this.books.push(newBook);

    // Delete a book from the list
    rBtn.addEventListener("click", () => {
      this.removeBook(newCell.dataset);
    });

    // Mark a book read
    this.markRead(book_Read);

    // Increment BookCount By One
    this.bookCount++;


  }

  // Remove book from book list
  removeBook() {
    let bookRemoveId = Number(removeId.value);

    // Get a specific row by passing in a value
    const rowId = document.getElementById(bookRemoveId);

    // if the id exist it will be remove for the table
    if(rowId){
      // removing row for the table
      rowId.remove();
      removeId.value = "";
    }else{
      // find can't find the book ID this msg will be display
      alert(`Can't find Book ID: ${bookRemoveId}`)
      removeId.value = "";
    }

    // Iiterate over the books in th  library
    let findingBook = this.books.map((book) => book.id);

    // Finding the book ID that matches the input ID
    let book = findingBook.indexOf(bookRemoveId);



    // Removing book for the book data object
    if (findingBook.includes(bookRemoveId)) {
      this.books.splice(book, 1);
    }
  }
}

// Calling the Book Constructor
const book = new Library();

// Add new book Button
addNewBookBtn.addEventListener("click", addNewBook);

function reloadLibrary() {
  Library = JSON.parse(localStorage.Library);
  console.log(Library);

  bookTable.innerHTML = '';
  bookTable.appendChild(bookTable);

  for (let i = 0; i < library.length; i += 1) {
    // eslint-disable-next-line no-use-before-define
    DisplayBook(library[i]);
  }
}



// Method for adding new Book
async function addNewBook() {
  if (!bookTitle.valuebook && !bookAuthor.value) {
    alert("Please enter a book title/author.");
  } else {
    book.addBook();
    bookTitle.value = "";
    bookAuthor.value = "";
  }
}

removeBookButton.addEventListener("click", removeBookData);

function removeBookData() {
  // Remove the book from the list
  book.removeBook();
}
