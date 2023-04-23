export default function classNames(...args: Array<unknown>) {
  return args
    .filter(item => item && item)
    .join(" ");
}
