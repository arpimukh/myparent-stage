const nextConfig = {
  //  async headers() {
  //    return [
  //      {
  // //       // Apply CORS headers to all API routes
  //        source: "/v1/:path*",
  //        headers: [
  //          { key: "Access-Control-Allow-Credentials", value: "true" },
  //          { key: "Access-Control-Allow-Origin", value: "https://myparent-stage-ampu.vercel.app" }, // Replace with your domain in production
  //          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
  //          { 
  //            key: "Access-Control-Allow-Headers", 
  //            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" 
  //          },
  //        ],
  //      },
  //    ];
  //  },

  async rewrites() {
    return [
      {
        // 1. The path users will call on your frontend
        source: '/v1/:path*', 
        // 2. The internal URL of your backend deployment
        destination: 'https://myparent-stage-ampu.vercel.app/:path*', 
      },
    ];
  },
};

module.exports = nextConfig;


// frontend/next.config.js
// module.exports = {
//   async rewrites() {
//     return [
//       {
//         // 1. The path users will call on your frontend
//         source: '/api/:path*', 
//         // 2. The internal URL of your backend deployment
//         destination: '/v1/api/:path*', 
//       },
//     ];
//   },
// };