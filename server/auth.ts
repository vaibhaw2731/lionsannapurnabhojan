
export function requireAuth(req: any, res: any, next: any) {
  const userId = req.headers['x-replit-user-id'];
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}
