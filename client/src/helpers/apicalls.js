const APIURL = "/api/todos/"

export async function getToDos() {
  return fetch(APIURL)
    //fetch doesn't throw error with 4xx and 5xx responses
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
}

export async function createToDo(name) {
  return fetch(APIURL, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ name: name })
  })
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
}

export async function deleteToDo(id) {
  const deleteURL = APIURL + id;

  return fetch(deleteURL, {
    method: "DELETE"
  })
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
}

export async function updateToDo(id, completed) {
  const updateURL = APIURL + id;

  fetch(updateURL, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ completed: !completed })
  })
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
}