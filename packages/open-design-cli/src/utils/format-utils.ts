export function formatOutput(data: any, args: { format?: string }): string {
  const format = args.format || 'json';
  
  if (format === 'json') {
    return JSON.stringify(data, null, 2);
  }
  
  // Default to JSON for now
  return JSON.stringify(data, null, 2);
}

export function formatError(error: Error): string {
  return JSON.stringify({
    error: error.message,
    stack: error.stack
  }, null, 2);
}
