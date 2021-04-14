
const KEY = 'donateFlowTest';

const B_FLOW_PERCENTAGE = 25;

(async () => {
  const abTestFlow = localStorage.getItem(KEY);

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

  localStorage.setItem(KEY, setAbFlow);
})();
