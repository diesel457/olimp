import { Model } from 'racer'

export default class BaseModel extends Model.ChildModel {

  getId () {
    let actualField = this.dereferenceSelf()
    return actualField.leaf()
  }

  dereferenceSelf () {
    let model = this.root
    let segments = model._splitPath(this.path())
    return model.scope(model._dereference(segments, true).join('.'))
  }

  static now () {
    return (window && window.timeSync) ? window.timeSync.server() : Date.now()
  }

}