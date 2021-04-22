
const KEY = 'donateFlowTest';

const B_FLOW_PERCENTAGE = 50;

(async () => {
  let abTestFlow;

  try {
    abTestFlow = localStorage.getItem(KEY);
  } catch (error) {
    console.log('LocalStorage not available to read');
  }

  if (abTestFlow) {
    window.paymentFlowAB = abTestFlow;
    return;
  }

  const random = Math.random() * 100;
  let setAbFlow = 'old';
  if (random < B_FLOW_PERCENTAGE) {
    setAbFlow = 'new';
  }

  window.paymentFlowAB = setAbFlow;
  try {
    localStorage.setItem(KEY, setAbFlow);
  } catch (error) {
    console.log('LocalStorage not available to write');
  }
})();
