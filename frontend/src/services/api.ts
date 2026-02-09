const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!API_BASE_URL) {
  console.error('NEXT_PUBLIC_BACKEND_API_URL is not defined');
}

export const fetcher = async (url: string) => {
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // @ts-expect-error no error def for now
    error.info = await response.json();
    // @ts-expect-error no error def for now
    error.status = response.status;
    throw error;
  }
  return response.json();
};

// Helper functions for common HTTP methods
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = async <T>(url: string, data: any): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = new Error('An error occurred while posting data.');
    // @ts-expect-error no error def for now
    error.info = await response.json();
    // @ts-expect-error no error def for now
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) {
    const error = new Error('An error occurred while fetching data.');
    // @ts-expect-error no error def for now
    error.info = await response.json();
    // @ts-expect-error no error def for now
    error.status = response.status;
    throw error;
  }
  return response.json();
};
