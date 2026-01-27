import React from 'react';

interface Props {
  onBack: () => void;
}

const ManualPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-stone-950 text-white p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-500 font-black uppercase tracking-widest hover:text-emerald-400 transition-colors mb-8 group"
        >
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Dashboard
        </button>

        <header className="mb-12 border-l-8 border-emerald-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">System Manual</h1>
          <p className="text-stone-500 font-bold uppercase tracking-widest text-sm md:text-base">Operational Guides & Configuration</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Hardware Sync Guide */}
          <section className="bg-emerald-600 rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-emerald-600/20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="shrink-0">
                <i className="fa-solid fa-microchip text-7xl md:text-9xl opacity-20"></i>
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Hardware Sync Required</h2>
                <p className="font-bold text-emerald-100 leading-relaxed mb-6">
                  Ensure your ESP32 Camera and Arduino UNO are connected via USB before starting the local server. The browser will prompt for Serial access once the dashboard loads.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-emerald-800/50 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Baud: 115200 (ESP32)</span>
                  <span className="bg-emerald-800/50 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Baud: 9600 (Arduino)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Configuration Guide */}
          <section className="bg-stone-900 rounded-[30px] p-8 border-b-8 border-stone-800 relative overflow-hidden group">
             <div className="flex items-center gap-4 mb-8">
                <div className="bg-stone-800 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 border border-white/5 text-emerald-500">
                    <i className="fa-solid fa-gears"></i>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-white">System Configuration</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-stone-800/50 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-emerald-500 font-black uppercase text-xs tracking-widest mb-3">1. Hardware Code</h3>
                  <p className="text-stone-400 text-xs font-bold leading-relaxed mb-4">
                    Go to the <span className="text-white">"hardware_code"</span> folder in the project directory. You will find:
                  </p>
                  <ul className="space-y-2 text-[10px] font-black uppercase text-stone-500">
                    <li className="flex items-center gap-2"><i className="fa-solid fa-microchip text-emerald-600"></i> ESP32_CAM_WIRED.ino</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-microchip text-emerald-600"></i> ARDUINO_UNO_SENSORS.ino</li>
                  </ul>
                </div>

                <div className="bg-stone-800/50 p-6 rounded-2xl border border-white/5">
                   <h3 className="text-emerald-500 font-black uppercase text-xs tracking-widest mb-3">2. Dual-Wired Setup</h3>
                   <p className="text-stone-400 text-xs font-bold leading-relaxed mb-4">
                     This system uses two separate USB connections for maximum reliability and speed.
                   </p>
                   <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                     <p className="text-[9px] text-emerald-500 font-black uppercase">Required Connections:</p>
                     <ul className="text-[10px] text-white font-bold mt-1 space-y-1">
                        <li>• USB 1: ESP32 Camera</li>
                        <li>• USB 2: Arduino Sensor Node</li>
                     </ul>
                   </div>
                </div>
             </div>

             <div className="mt-4 bg-emerald-600/10 border border-emerald-600/20 p-6 rounded-2xl">
                <h3 className="text-emerald-500 font-black uppercase text-xs tracking-widest mb-3">3. Fire Detection & Wiring</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] font-bold text-stone-400">
                  <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                    <p className="text-emerald-500 font-black mb-1 uppercase">Sensors</p>
                    Connect Flame Sensors to Pins <span className="text-white">2, 3, 4</span> (Arduino Uno).
                  </div>
                  <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                    <p className="text-emerald-500 font-black mb-1 uppercase">Alarm</p>
                    Connect Buzzer to Pin <span className="text-white">5</span> (Arduino Uno).
                  </div>
                  <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                    <p className="text-emerald-500 font-black mb-1 uppercase">Logic</p>
                    Sensors are active <span className="text-white">LOW</span>. Buzzer activates when any sensor detects fire.
                  </div>
                </div>
             </div>
          </section>

          {/* Wireless Guide */}
          <section className="bg-emerald-600 rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-emerald-600/20">
            <header className="mb-10">
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-tower-broadcast text-3xl"></i>
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Wireless Guide</h2>
              <p className="text-emerald-100 font-bold uppercase tracking-widest text-sm">How to connect your hardware via Wi-Fi</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-[30px] p-6 border border-white/10">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-3">
                  <i className="fa-solid fa-camera"></i>
                  ESP32 Camera
                </h3>
                <ul className="space-y-3 text-emerald-100 font-bold text-sm">
                  <li className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-white text-emerald-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black">1</span>
                    Flash the ESP32_CAM_WIRELESS.ino
                  </li>
                  <li className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-white text-emerald-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black">2</span>
                    Open Serial Monitor to get the IP
                  </li>
                  <li className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-white text-emerald-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black">3</span>
                    Enter IP in dashboard & click Join
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-[30px] p-6 border border-white/10">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-3">
                  <i className="fa-solid fa-microchip"></i>
                  Sensor Node
                </h3>
                <ul className="space-y-3 text-emerald-100 font-bold text-sm">
                  <li className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-white text-emerald-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black">1</span>
                    Flash SENSOR_NODE_WIRELESS.ino
                  </li>
                  <li className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-white text-emerald-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black">2</span>
                    Connect 3 Flame Sensors to pins 34, 35, 32
                  </li>
                  <li className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                    <span className="bg-white text-emerald-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black">3</span>
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

          {/* Hotspot Mode */}
          <section className="bg-stone-900 rounded-[30px] p-8 border-b-8 border-stone-800 relative overflow-hidden group">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6 text-white flex items-center gap-3">
                <i className="fa-solid fa-tower-broadcast text-emerald-500"></i>
                No Router? Use Hotspot Mode
              </h2>
              <p className="text-stone-400 text-sm font-bold leading-relaxed mb-6">
                If you are in a location with **zero internet and no Wi-Fi router**, the APULA system will automatically create its own Wi-Fi network.
              </p>
              
              <div className="bg-emerald-600/10 border border-emerald-600/20 p-6 rounded-3xl">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <p className="text-emerald-500 font-black uppercase text-[10px] tracking-widest mb-2">How to connect:</p>
                    <ol className="space-y-3 text-xs font-bold text-stone-300">
                      <li>1. Turn on your ESP32 devices.</li>
                      <li>2. On your laptop, look for Wi-Fi named <span className="text-white">"APULA_SENSOR_NODE"</span> or <span className="text-white">"APULA_CAMERA"</span>.</li>
                      <li>3. Connect using password: <span className="text-emerald-500 font-black">apula123</span></li>
                      <li>4. Use IP <span className="text-emerald-500 font-black">192.168.4.1</span> in the dashboard.</li>
                    </ol>
                  </div>
                  <div className="md:w-px md:bg-white/10"></div>
                  <div className="flex-1">
                    <p className="text-emerald-500 font-black uppercase text-[10px] tracking-widest mb-2">Note:</p>
                    <p className="text-[10px] text-stone-500 italic leading-relaxed">
                      Hotspot mode is a backup. For the best experience (connecting both camera and sensors at once), using a central router is recommended.
                    </p>
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

export default ManualPage;