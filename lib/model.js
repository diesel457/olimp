import racer from 'racer'
let isServer = typeof window === 'undefined'

let bundle
let model

if (!isServer) {
  let bundleElement = document.getElementById('bundle')
  bundle = JSON.parse((bundleElement && bundleElement.innerHTML))

  model = racer.createModel()

  // HACK: workaround for tests
  try {
    model.createConnection()
  } catch (err) {
    console.log(err)
  }

  if (bundle) model.unbundle(bundle)

  if (!isServer) window.model = model

  // Time before unsubscribe really does
  model.root.unloadDelay = 3000
}

export default model
