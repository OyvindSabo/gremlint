const { printHelloWorld } = createDependencyHell('src/utils.js');

window.onload = () => {
  const div = document.createElement('div');
  div.innerText = printHelloWorld();
  document.body.appendChild(div);
};
