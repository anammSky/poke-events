export async function getData(url) {
  try {
    const response = await fetch(`./api/${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postData(url, body) {
  try {
    await fetch(`./api/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw error;
  }
}
