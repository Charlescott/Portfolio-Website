const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  if (!response.ok) {
    let errorDetail = '';
    try {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const body = await response.json();
        errorDetail = body?.error || body?.message || '';
      } else {
        errorDetail = (await response.text()) || '';
      }
    } catch (_error) {
      // Ignore parse errors and fall back to status.
    }

    const suffix = errorDetail ? ` - ${errorDetail}` : '';
    throw new Error(`Request failed: ${response.status}${suffix}`);
  }
  return response.json();
}

export function fetchPortfolio() {
  return request('/portfolio');
}

export function fetchPathway(slug) {
  return request(`/pathways/${slug}`);
}

export function submitInquiry(payload) {
  return request('/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
