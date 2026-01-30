// frontend/next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        // 1. The path users will call on your frontend
        source: '/api/v1/:path*', 
        // 2. The internal URL of your backend deployment
        destination: 'https://myparent-stage-a2zc-avcxfo3zw-arpimukhs-projects.vercel.app/:path*', 
      },
    ];
  },
};