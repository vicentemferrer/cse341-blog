export default function filterByTerm(inputArr, searchTerm) {
  const regex = new RegExp(searchTerm, 'i');
  return inputArr.filter((arrayElement) => arrayElement.url.match(regex));
}
