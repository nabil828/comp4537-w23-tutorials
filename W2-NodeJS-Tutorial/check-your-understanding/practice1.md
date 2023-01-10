Here's an exercise you can try to practice working with Promises in JavaScript:

1.  Create a new JavaScript file and define a function called `fetchData` that returns a new Promise. The promise should resolve after 3 seconds with a string message "Data fetched!".

<details>
  <summary>Solution </summary>
  
```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 3000);
  });
}
```
</details>


2.  Call the `fetchData` function and use the `.then` method to log the message returned by the promise to the console.


<details>
  <summary>Solution </summary>
  
```js
fetchData().then(console.log);

```
</details>

3.  Update the `fetchData` function to randomly either resolve with the string "Data fetched!" or reject with an error message "Error: Could not fetch data."

<details>
  <summary>Solution </summary>
  
```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Data fetched!");
      } else {
        reject(Error("Error: Could not fetch data."));
      }
    }, 3000);
  });
}

```
</details>


4.  Call the `fetchData` function and use both `.then` and `.catch` method to handle the resolution and rejection of the promise.



<details>
  <summary>Solution </summary>
  
```js
fetchData()
  .then(console.log)
  .catch(console.error);

```
</details>


5.  Create another function called `fetchUsers` that returns a promise that resolves with an array of user objects.



<details>
  <summary>Solution </summary>
  
```js
function fetchUsers()

```
</details>