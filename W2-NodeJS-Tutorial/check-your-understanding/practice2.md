# rewrite the previous example using async/await


Here's an example of how you can use `async/await` to work with Promises:

1.  Create a new JavaScript file and define an `async` function called `fetchData` that returns a Promise.



<details>
  <summary>Solution </summary>
  
```js
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 3000);
  });
}

```
</details>

2.  Use the `await` keyword to wait for the promise to resolve, and then store the result in a variable.



<details>
  <summary>Solution </summary>
  
```js
async function fetchDataAndPrint() {
  const result = await fetchData();
  console.log(result);
}

```
</details>

3.  To handle errors, you can wrap the `await` expression in a try-catch block.



<details>
  <summary>Solution </summary>
  
```js
async function fetchDataAndPrint() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

```
</details>

4.  Now you can call the `fetchDataAndPrint` function which will print "Data fetched!" after 3 seconds.



<details>
  <summary>Solution </summary>
  
```js
fetchDataAndPrint();

```
</details>

You can make the example more realistic by adding randomness or adding more functionality to `fetchData` function as before. The advantage of using async/await is that it makes the code look and feel more synchronous and it allows developers to write asynchronous code that looks similar to synchronous code, which makes it much more readable.