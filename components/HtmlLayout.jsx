import React, { Component, PropTypes } from 'react'

class HtmlLayout extends Component {

  static propTypes = {
    app: PropTypes.string,
    children: PropTypes.any,
    model: PropTypes.object
  }

  static defaultProps = {
    app: 'main'
  }

  render () {
    let { app, children, model } = this.props
    let json = model.getBundleJson()

    let style
    if (process.env.NODE_ENV !== 'development') {
      style = <link href={`/css/apps/${app}.styles.css`} rel='stylesheet' type='text/css' />
    }

    return (
      <html>
        <head>
          <title>Boilerplate</title>
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta charSet='utf-8' />
          {style}
        </head>
        <body>
          <div id='root'>{children}</div>
          <script defer src={`/js/${app}.bundle.js`}></script>
          <script type='application/json' id='bundle' dangerouslySetInnerHTML={{__html: json}}></script>
        </body>
      </html>
    )
  }
}

export default HtmlLayout
