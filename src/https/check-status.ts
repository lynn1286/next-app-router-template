const checkStatus = (status: number) => {
  switch (status) {
    case 401:
      console.log('🚀 ~  : checkStatus -> ', status);
      break;

    default:
      break;
  }
};

export default checkStatus;
