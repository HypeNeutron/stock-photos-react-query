type DataRes = { error?: { message: string }; message: string };
type Err = { response?: { data: any }; message: string };

type TypePropError =
  | { err: Err; res?: never }
  | { err: Err; res: Err & DataRes };

export const getError = ({ err, res }: TypePropError) => {
  let message: string;
  let dataRes = res?.response?.data;
  if (!res) dataRes = err?.response?.data;

  if (dataRes) {
    if (dataRes.error.message) return (message = dataRes.error.message);
    return (message = dataRes.message);
  } else if (!res) {
    message = err.message;
  } else message = res.message;

  //   if (typeof dataRes === 'string') return (message = dataRes); // debug only
  if (message.includes('Network Error'))
    message =
      'Something went wrong 👻 Please check your Network connection and try again';
  return message || 'Something went wrong, Please try again or contact us';
};
