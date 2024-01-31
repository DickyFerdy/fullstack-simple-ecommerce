const delay = async (promise, time) => {
  await new Promise(resolve => {
    setTimeout(resolve, time);
  });
  return promise;
};

export default delay;