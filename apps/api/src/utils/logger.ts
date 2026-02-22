export const logger = {
  info: (msg: string) => console.log(`[INFO] [${new Date().toISOString()}] ${msg}`),
  error: (msg: string, stack?: string) => console.error(`[ERROR] [${new Date().toISOString()}] ${msg}`, stack || ''),
  warn: (msg: string) => console.warn(`[WARN] [${new Date().toISOString()}] ${msg}`),
};
