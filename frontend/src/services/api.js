const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";


async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Something went wrong."
    );
  }

  return data;
}


export async function scanUrl(url) {
  const response = await fetch(
    `${API_BASE_URL}/api/url/scan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }
  );

  return handleResponse(response);
}


export async function scanMessage(message) {
  const response = await fetch(
    `${API_BASE_URL}/api/message/scan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );

  return handleResponse(response);
}


export async function scanEmail(email) {
  const response = await fetch(
    `${API_BASE_URL}/api/email/scan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  return handleResponse(response);
}


export async function scanImage(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/image/scan`,
    {
      method: "POST",
      body: formData,
    }
  );

  return handleResponse(response);
}


export async function scanVideo(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/video/scan`,
    {
      method: "POST",
      body: formData,
    }
  );

  return handleResponse(response);
}


export async function scanQR(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/qr/scan`,
    {
      method: "POST",
      body: formData,
    }
  );

  return handleResponse(response);
}


export async function checkBackendHealth() {
  const response = await fetch(
    `${API_BASE_URL}/health`
  );

  return handleResponse(response);
}