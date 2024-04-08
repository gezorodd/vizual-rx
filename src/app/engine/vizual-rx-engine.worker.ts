/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  console.log(data);
});
