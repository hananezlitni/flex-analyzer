
export default {
  //mode: 'universal',
  router: {
    base: '/'
  },
  target: 'server',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Flexibility Structure Analyzer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Playfair+Display&display=swap' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,900&display=swap' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  //loading: { color: '#2bafec', continuous: 'true', height: '3px' },
  loading: false,
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources'
  ],
  /*
  ** Styling
  */
  styleResources: {
    // your settings here
    scss: ['~/assets/scss/main.scss'] // alternative: scss
  },
  buildModules: [
    '@nuxtjs/dotenv'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config) {
      // ..
      config.module.rules.push(
        {
          test: /\.(csv)$/,
          loader: 'file-loader',
          options: {
              name: `files/[name].[ext]`
          }
        },
        {
          type: 'javascript/auto',
          test: /configs.js$/,
          loader: 'file-loader',
          options: {
              name: `files/[name].[ext]`
          }
        },
        {
          test: /\.md$/,
          loader: 'raw-loader',
        }
      ) 

      config.node = {
        fs: 'empty'
      }
    }
  }
}
