const AUTH_API = `${import.meta.env.VITE_API_URL}/recruiter`;

export async function registerRecruiter(data) {
  const endpoint = `${AUTH_API}/register`;
  return fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => (res.isRight ? Promise.resolve() : Promise.reject(res.value)));
}
