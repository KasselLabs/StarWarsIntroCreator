export const setPaypalKey = (key) => {
  const inputs = document.querySelectorAll('input[type=hidden][name=custom]');
  let inputsArray = inputs;
  if (!inputs.forEach) {
    inputsArray = Array.from(inputs);
  }

  inputsArray.forEach((input) => {
    input.value = key;
  });
};

export default setPaypalKey;
