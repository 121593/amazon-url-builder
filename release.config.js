if (!process.env.CI) {
  const debug = require('debug')
  debug.enable('semantic-release:*')
}

module.exports = {
  // Test mode
  dryRun: !process.env.CI,
  ci: !!process.env.CI,

  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'angular',
      releaseRules: [
        { type: 'docs', scope: 'README', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'ci', release: 'patch' },
        { type: 'build', release: 'patch' },
        { type: 'chore', release: 'patch' }
      ]
    }],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}
