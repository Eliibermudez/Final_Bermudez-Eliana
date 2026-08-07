const API_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (
  endpoint,
  {
    method = "GET",
    token = "",
    body = null,
  } = {}
) => {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body !== null) {
    headers["Content-Type"] = "application/json";
  }

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body !== null ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(
      "No se pudo conectar con el servidor. Verificá que el backend esté activo."
    );
  }

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : null;

  if (response.status === 401 && token) {
    window.dispatchEvent(new Event("unauthorized"));
  }

  if (!response.ok) {
    throw new Error(
      data?.message || "Ocurrió un error en la solicitud"
    );
  }

  return data;
};