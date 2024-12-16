export const parseResponse = (response: string): { type: string; content: string } => {
  const parts = response.split('|');
  if (parts.length === 2) {
    return { type: parts[0].trim(), content: parts[1].trim() };
  }
  return { type: 'text', content: response };
};

