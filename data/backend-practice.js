//XMLHttp Request(built in class in java script)
//Type of request (GET PUT POST DELETE)
// URL = Uniform Resource Locator
//-like an address ,but for the internet
//-helps us locate another computer on internet 
// Promise is a new class which is used for to run multiple code at same time.
// why do we use promises:because callbacks cause a lot of nesting 
// fetch()= better way to make HTTP request.
// fetch() uses a promises
//Asyn Await =even better way to handle asynchoronus code.
//Async =makes a function and return the promises
 
const xhr=new XMLHttpRequest();
xhr.addEventListener('load',()=>{
  // console.log(xhr.response);
});
xhr.open('GET','https://supersimplebackend.dev/images/apple.jpg');
xhr.send();

