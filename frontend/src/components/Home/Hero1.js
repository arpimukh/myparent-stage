const Hero1 = () => {
    return (
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '10px 0',
        textAlign: 'center'
      }}>
        
        <div className="flex justify-center mb-6">
          <div className="relative w-21 h-21 flex items-center justify-center border-4 border-pink-200/50 rounded-full bg-white/10 backdrop-blur-sm shadow-xl">
             {/* Replace this SVG with your actual exported logo file */}
            <div className="relative w-20 h-20flex items-center justify-center border-4 border-pink-200/50 rounded-full bg-white backdrop-blur-sm shadow-xl">
            <img 
              src="/images/logo.svg" 
              alt="Living Trail Logo" 
              className="w-full h-full object-contain"
            />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Living Trail</h1>
        <p className="text-xl opacity-90 mb-8">Your On-Demand Service Hub</p>
        
        {/* App Store Buttons */}
        {/* <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-black hover:bg-slate-900 transition flex items-center px-6 py-2 rounded-xl border border-white/20">
            <span className="text-left ml-2">
              <p className="text-[10px] uppercase">Download on the</p>
              <p className="text-lg font-semibold leading-none">App Store</p>
            </span>
          </button>
          <button className="bg-black hover:bg-slate-900 transition flex items-center px-6 py-2 rounded-xl border border-white/20">
            <span className="text-left ml-2">
              <p className="text-[10px] uppercase">Get it on</p>
              <p className="text-lg font-semibold leading-none">Google Play</p>
            </span>
          </button>
        </div> */}
      </section>
    )
  }
  
  export default Hero1