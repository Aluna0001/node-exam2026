export function isAuthenticated (req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send({ error: 'You must be logged in' })
  }
  next()
}

export function isOwner (req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send({ error: 'You must be logged in' })
  }
  if (req.session.role !== 'owner') {
    return res.status(403).send({ error: 'Owner access required' })
  }
  next()
}

export function isAdmin (req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send({ error: 'You must be logged in' })
  }
  if (req.session.role !== 'admin' && req.session.role !== 'owner') {
    return res.status(403).send({ error: 'Admin access required' })
  }
  next()
}
