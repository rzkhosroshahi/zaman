export const fa = n =>
  Number(n).toLocaleString("fa", {
    useGrouping: false,
  });

// prettier-ignore
export const inputMask = [/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/];
