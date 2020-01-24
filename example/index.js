const http = require('http')
// Templating
const ejs = require('ejs')
const { join } = require('path')
// Post request handling
const qs = require('querystring')
const { AmazonUrlBuilder } = require('../src')

const categories = {
  SPORTING_GOODS: { slug: 'sporting-goods', id: '2811119011' },
  PALETTE_KNIVES: { slug: 'arts-crafts', id: '12897951' },
  COFFEE_MACHINE_CLEANING_PRODUCTS: { slug: 'home-garden', id: '3115626011' },
  COFFEE_MACHINE_ACCESSORIES: { slug: 'home-garden', id: '289743' },
  ADAPTERS: { slug: 'electronics', id: '3117831011' },
  LENSES: { slug: 'electronics', id: '3117833011' },
  INTERCONNECT_CABLES: { slug: 'automotive', id: '10981531' },
  PRINTERS: { slug: 'office-products', id: '172635' },
  PRINTER_PARTS_AND_ACCESSORIES: { slug: 'OfficeProducts', id: '172636' },
  TANNING_OILS: { slug: 'beauty', id: '11062731' },
  DOWN_AND_DOWN_ALTERNATIVE: { slug: 'fashion', id: '2348894011' },
  PARKAS: { slug: 'fashion', id: '12643251011' },
  ACTIVE_AND_PERFORMANCE: { slug: 'fashion', id: '2348893011' },
  JEWELRY_BOXES_AND_ORGANIZERS: { slug: 'handmade', id: '11435544011' },
  FLASHING: { slug: 'tools', id: '13398821' },
  GUTTERS: { slug: 'tools', id: '13398831' },
  ROBES: { slug: 'fashion-boys', id: '1046026' },
  WATERCOLOR_PAINT: { slug: 'toys', id: '2488755011' },
  JEANS: { slug: 'baby', id: '2475828011' },
  LEGGINGS: { slug: 'baby', id: '10932935011' },
  FEMININE_WASHES: { slug: 'health-personal-care', id: '13226755011' },
  DJ_HEADPHONES: { slug: 'musical-instruments', id: '5524096011' },
  FRUIT_AND_NUT: { slug: 'grocery', id: '11437474011' },
  NIBS: { slug: 'arts-crafts', id: '8090748011' },
  LIGHT_BOXES: { slug: 'arts-crafts', id: '12896801' },
  BULLET_CAMERAS: { slug: 'electronics', id: '14241331' },
  DOME_CAMERAS: { slug: 'electronics', id: '14241151' },
  LENS_MOUNT_RINGS: { slug: 'electronics', id: '3190374011' },
  ACCESS_CONTROL_KEYPADS: { slug: 'electronics', id: '11041131' },
  IR_ILLUMINATORS: { slug: 'electronics', id: '7161095011' },
  CONSOMME: { slug: 'grocery', id: '724736011' },
  DUVET_COVERS: { slug: 'home-garden', id: '362536011' },
  DUVET_COVER_SETS: { slug: 'home-garden', id: '10671056011' },
  SHOEGAZING: { slug: 'music', id: '602094' },
  SNACK_GIFTS: { slug: 'grocery', id: '2255582011' },
  POWDER: { slug: 'beauty', id: '11058971' },
  PHOTOGRAPHY: { slug: 'mobile-apps', id: '2478860011' },
  SOAP_AND_SHAMPOO: { slug: 'beauty', id: '388109011' },
  PAPER_CRAFT: { slug: 'toys', id: '166070011' },
  JAMMERS: { slug: 'sporting-goods', id: '2371137011' },
  CUFFLINKS: { slug: 'handmade', id: '11435870011' },
  TIE_CLIPS: { slug: 'handmade', id: '11435872011' }
}

// noinspection JSUnusedLocalSymbols
const processPost = (req, res) => new Promise((resolve, reject) => {
  // Gather POST data
  let body = ''
  req.on('data', function (data) {
    body += data
    // Too much POST data (~1M), kill the connection!
    if (body.length > 1e6) { req.connection.destroy() }
  })

  req.on('end', function () {
    const post = qs.parse(body)
    resolve(post)
    // process
  })
})

const renderTemplate = (res, data = {}) => {
  const dataWithConstants = Object.assign(data, { categories })

  ejs.renderFile(join(__dirname, '/main.ejs'), dataWithConstants, function (err, html) {
    res.writeHead(err ? 400 : 200, { 'Content-Type': 'text/html' })
    res.write(html || 'Error rendering ejs')
    res.end()
  })
}

const handleProcessError = (res, error) => {
  console.error(error)
  return renderTemplate(res, { error })
}

// Actual server code
const server = http.createServer(function (req, res) {
  // Fetch route
  const postUrls = ['/generateNodeUrl', '/generateNodeBestSellersUrl', '/generateProductUrl', '/generateLookupUrl']

  if (req.method === 'POST' && postUrls.includes(req.url)) {
    return processPost(req, res)
      .then(post => {
        let result
        console.log(post)

        switch (req.url) {
          case '/generateNodeUrl':
            result = AmazonUrlBuilder.buildUrlNodeById(post.nodeId)
            break

          case '/generateNodeBestSellersUrl' :
            result = AmazonUrlBuilder.buildUrlBestSellerByNodeSlug(post.nodeSlug)
            break

          case '/generateProductUrl' :
            result = AmazonUrlBuilder.buildUrlProductById(post.productId)
            break

          case '/generateLookupUrl' :
            if (Object.hasOwnProperty.call(post, 'categoryI') && post.categoryI && post.categoryI.length) {
              result = AmazonUrlBuilder.buildUrlSearchByTermAndCategory(post.searchTerm, post.categoryI)
            } else {
              result = AmazonUrlBuilder.buildUrlSearchByTerm(post.searchTerm)
            }
            break
        }

        return renderTemplate(res, { result })
      })
      .catch(error => handleProcessError(res, error))
  } else {
    return renderTemplate(res)
  }
})
server.listen(8080)
