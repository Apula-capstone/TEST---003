import React from 'react';

interface Props {
  onBack: () => void;
}

const DownloadPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-stone-950 text-white p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest hover:text-orange-400 transition-colors mb-8 group"
        >
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Dashboard
        </button>

        <header className="mb-12 border-l-8 border-orange-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">Offline Setup</h1>
          <p className="text-stone-500 font-bold uppercase tracking-widest text-sm md:text-base">Everything you need in one package</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Step 1: The All-in-One Package */}
          <section className="bg-orange-600 rounded-[30px] p-8 md:p-10 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white text-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-3xl shadow-xl">1</div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Download the Package</h2>
              </div>
              <p className="text-orange-100 mb-8 text-lg font-bold leading-relaxed">
                Click the button below to get the **"APULA Offline Kit"**. <br/>
                This ZIP file contains the software **AND** the Node.js installer so you don't need the internet later.
              </p>
              <a 
                href="./APULA_OFFLINE_KIT.zip" 
                download
                className="inline-flex items-center gap-4 bg-white text-stone-950 font-black px-10 py-6 rounded-[25px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl text-xl"
              >
                <i className="fa-solid fa-file-zipper text-2xl"></i>
                Download Offline Kit
              </a>
              <p className="mt-4 text-xs font-black uppercase tracking-widest opacity-60 italic">* Size: ~50MB // Includes Node.js Installer</p>
            </div>
          </section>

          {/* Step 2: Simple Install */}
          <section className="bg-stone-900 rounded-[30px] p-8 border-b-8 border-stone-800 relative overflow-hidden group">
            <div className="flex items-start gap-6 relative z-10">
              <div className="bg-stone-800 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 border border-white/5">2</div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">How to Install</h2>
                <ul className="space-y-4 text-stone-400 font-bold">
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-check text-orange-500"></i>
                    Open the ZIP file you just downloaded.
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-check text-orange-500"></i>
                    Run the **"nodejs-installer.msi"** inside first.
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-check text-orange-500"></i>
                    Just keep clicking "Next" until the installer finishes.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step 3: Run the System */}
          <section className="bg-stone-900 rounded-[30px] p-8 border-b-8 border-stone-800 relative overflow-hidden group">
            <div className="flex items-start gap-6 relative z-10">
              <div className="bg-stone-800 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 border border-white/5">3</div>
              <div className="w-full">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Start APULA</h2>
                <p className="text-stone-400 mb-6 font-bold">Double-click the file named **"START_APULA.bat"** in the folder.</p>
                
                <div className="bg-stone-950 rounded-2xl p-6 border border-white/5 flex items-center gap-4 shadow-inner mb-6">
                  <div className="bg-emerald-500/10 p-4 rounded-xl">
                    <i className="fa-solid fa-terminal text-emerald-500 text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-emerald-500 font-black uppercase text-xs tracking-widest">Auto-Runner Active</p>
                    <p className="text-stone-500 text-[10px] font-bold">The system will open in your browser automatically.</p>
                  </div>
                </div>

                {/* Troubleshooting */}
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mb-4">
                  <p className="text-orange-500 text-[10px] font-black uppercase mb-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Not working?
                  </p>
                  <p className="text-stone-500 text-xs font-bold leading-tight">
                    If the black window closes immediately, please **RESTART** your computer. This finishes the Node.js installation.
                  </p>
                </div>

                {/* Shortcut Tip */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                  <p className="text-emerald-500 text-[10px] font-black uppercase mb-1">
                    <i className="fa-solid fa-desktop mr-2"></i>
                    Desktop Shortcut
                  </p>
                  <p className="text-stone-500 text-xs font-bold leading-tight">
                    The system will automatically create a shortcut on your desktop the first time you run it!
                  </p>
                </div>

                {/* Step 4: Wireless Setup */}
                <div className="mt-8 pt-8 border-t border-white/5">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-6 text-white flex items-center gap-3">
                    <i className="fa-solid fa-wifi text-orange-500"></i>
                    Wireless Configuration
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-stone-800/50 p-6 rounded-2xl border border-white/5">
                      <h3 className="text-orange-500 font-black uppercase text-xs tracking-widest mb-3">1. Hardware Code</h3>
                      <p className="text-stone-400 text-xs font-bold leading-relaxed mb-4">
                        Go to the <span className="text-white">"hardware_code"</span> folder in the project directory. You will find:
                      </p>
                      <ul className="space-y-2 text-[10px] font-black uppercase text-stone-500">
                        <li className="flex items-center gap-2"><i className="fa-solid fa-microchip text-orange-600"></i> ESP32_CAM_WIRELESS.ino</li>
                        <li className="flex items-center gap-2"><i className="fa-solid fa-microchip text-orange-600"></i> SENSOR_NODE_WIRELESS.ino (ESP32)</li>
                        <li className="flex items-center gap-2"><i className="fa-solid fa-microchip text-orange-600"></i> ARDUINO_UNO_SENSORS.ino (Uno)</li>
                      </ul>
                    </div>

                    <div className="bg-stone-800/50 p-6 rounded-2xl border border-white/5">
                      <h3 className="text-orange-500 font-black uppercase text-xs tracking-widest mb-3">2. Multi-Device Mode</h3>
                      <p className="text-stone-400 text-xs font-bold leading-relaxed mb-4">
                        The ESP32 now acts as a **Hub**. You can open the APULA Dashboard on multiple laptops or phones simultaneously, and they will all show the same live data.
                      </p>
                      <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                        <p className="text-[9px] text-emerald-500 font-black uppercase">Feature Active:</p>
                        <p className="text-[10px] text-white font-bold">Concurrent WebSocket Connections</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-orange-600/10 border border-orange-600/20 p-6 rounded-2xl">
                    <h3 className="text-orange-500 font-black uppercase text-xs tracking-widest mb-3">3. Fire Detection & Wiring</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] font-bold text-stone-400">
                      <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                        <p className="text-orange-500 font-black mb-1 uppercase">Sensors</p>
                        Connect Flame Sensors to Pins <span className="text-white">34, 35, 32</span> (ESP32) or <span className="text-white">2, 3, 4</span> (Uno).
                      </div>
                      <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                        <p className="text-orange-500 font-black mb-1 uppercase">Alarm</p>
                        Connect Buzzer to Pin <span className="text-white">33</span> (ESP32) or Pin <span className="text-white">5</span> (Uno).
                      </div>
                      <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                        <p className="text-orange-500 font-black mb-1 uppercase">Logic</p>
                        Sensors are active <span className="text-white">LOW</span>. Buzzer activates when any sensor detects fire.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Wireless Setup Guide */}
          <section className="bg-orange-600 rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-orange-600/20">
            <header className="mb-10">
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-tower-broadcast text-3xl"></i>
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Wireless Guide</h2>
              <p className="text-orange-100 font-bold uppercase tracking-widest text-sm">How to connect your hardware via Wi-Fi</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-[30px] p-6 border border-white/10">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-3">
                  <i className="fa-solid fa-camera"></i>
                  ESP32 Camera
                </h3>
                <ul className="space-y-3 text-orange-500/90 font-bold text-sm">
                  <li className="bg-white rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs">1</span>
                    Flash the ESP32_CAM_WIRELESS.ino
                  </li>
                  <li className="bg-white rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs">2</span>
                    Open Serial Monitor to get the IP
                  </li>
                  <li className="bg-white rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs">3</span>
                    Enter IP in dashboard & click Join
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-[30px] p-6 border border-white/10">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-3">
                  <i className="fa-solid fa-microchip"></i>
                  Sensor Node
                </h3>
                <ul className="space-y-3 text-orange-500/90 font-bold text-sm">
                  <li className="bg-white rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs">1</span>
                    Flash SENSOR_NODE_WIRELESS.ino
                  </li>
                  <li className="bg-white rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs">2</span>
                    Connect 3 Flame Sensors to pins 34, 35, 32
                  </li>
                  <li className="bg-white rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs">3</span>
                    Enter Node IP in dashboard & click Join
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-black/20 rounded-[25px] p-6 border border-white/5 text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                Make sure your PC and Hardware are on the SAME Wi-Fi network!
              </p>
            </div>
          </section>

          {/* Hardware Guide */}
          <section className="bg-orange-600 rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-orange-600/20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="shrink-0">
                <i className="fa-solid fa-microchip text-7xl md:text-9xl opacity-20"></i>
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Hardware Sync Required</h2>
                <p className="font-bold text-orange-100 leading-relaxed mb-6">
                  Ensure your ESP32 Camera and Arduino UNO are connected via USB before starting the local server. The browser will prompt for Serial access once the dashboard loads.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-orange-800/50 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Baud: 115200 (ESP32)</span>
                  <span className="bg-orange-800/50 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Baud: 9600 (Arduino)</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-16 pb-12 text-center text-stone-600 font-bold uppercase tracking-[0.4em] text-[10px]">
          APULA // Air-Gapped Security Architecture // v2.6.0
        </footer>
      </div>
    </div>
  );
};

export default DownloadPage;
