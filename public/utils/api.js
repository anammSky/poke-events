export default async function getData(url) {
  try {
    const response = await fetch(`./api/${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
