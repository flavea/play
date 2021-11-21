const withOffline = require('next-offline')
const withImages = require('next-images')
const { join } = require('path')

const config = {
  generateInDevMode: false,
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: join(__dirname, '.next', 'sw.js'),
    // Do not precache images
    exclude: [/\.(?:png|jpg|jpeg|svg|json)$/],
    // Ignore all URL parameters.
    ignoreURLParametersMatching: [/.*/],
    dontCacheBustURLsMatching: /.*/,
    maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|woff2|webp)/,
        handler: 'CacheFirst',
      },
    ],
  },
  devIndicators: {
    autoPrerender: true,
  },
  compress: false,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  cleanDistDir: false,
  webpack5: false,
}

module.exports = withImages(withOffline(config))
