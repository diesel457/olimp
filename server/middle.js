const middle = {
  passportSessionSetup: function (req, res, next) {
    var model = req.model
    var userId = req.session.userId
    if (!userId) userId = req.session.userId = model.id()
    model.set('_session.userId', userId)

    var isAuthenticated = req.isAuthenticated()
    if (isAuthenticated) {
      if (!req.session.isAdmin) req.session.isAdmin = true
      model.set('_session.isAdmin', true)
      next()
    } else {
      delete req.session.isAdmin
      next()
    }
  }
}

export default middle
