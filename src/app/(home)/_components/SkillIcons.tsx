"use client";

export default function SkillIcons() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {/* React */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "0ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#61DAFB">
            <circle cx="12" cy="12" r="2" />
            <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1"/>
            <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">React</span>
      </div>

      {/* Next.js */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "50ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="black">
            <path d="M11.5 0c-.157 0-.314.003-.47.009C5.103.274.273 5.103.009 11.03 0 11.187 0 11.343 0 11.5c0 .157 0 .313.009.47.265 5.927 5.094 10.757 11.021 11.021.157.006.313.009.47.009.157 0 .313-.003.47-.009 5.927-.264 10.756-5.094 11.021-11.021.006-.157.009-.313.009-.47 0-.157-.003-.313-.009-.47C22.727 5.103 17.897.274 11.97.009 11.813.003 11.657 0 11.5 0zm.24 4.75h3.518l-5.255 7.427V19.5H6.75V4.75h3.245l5.255 7.427V4.75z"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Next.js</span>
      </div>

      {/* TypeScript */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "100ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12">
            <rect width="24" height="24" rx="4" fill="#3178C6"/>
            <path d="M13.5 16.5v3c.4.2.9.4 1.4.5.5.1 1 .2 1.6.2.5 0 1-.1 1.5-.2s.9-.3 1.3-.6c.4-.2.7-.6.9-1 .2-.4.3-.9.3-1.4 0-.6-.1-1.1-.4-1.5-.3-.4-.6-.7-1.1-1-.4-.3-.9-.5-1.4-.7-.5-.2-.9-.4-1.3-.6-.3-.2-.6-.4-.8-.6-.2-.2-.3-.5-.3-.8 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.2.7-.3.3-.1.5-.1.8-.1.3 0 .6 0 .8.1.3 0 .5.1.8.2.3.1.5.2.7.3.2.1.4.2.6.4v-2.7c-.4-.1-.8-.3-1.3-.4-.5-.1-1-.2-1.6-.2-.5 0-1 .1-1.5.2-.5.1-.9.3-1.3.6-.4.3-.7.6-.9 1.1-.2.4-.4.9-.4 1.5 0 1 .4 1.8 1.1 2.4.7.6 1.6 1.1 2.7 1.5.4.1.7.3 1 .5.3.2.5.4.6.6.1.2.2.5.2.8 0 .2-.1.5-.2.7-.1.2-.3.4-.5.5-.2.1-.5.2-.8.3-.3.1-.6.1-.9.1-.4 0-.8-.1-1.2-.2-.4-.1-.7-.3-1-.5zm-7-7.5h3v9h2.5v-9h3v-2h-8.5v2z" fill="white"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">TypeScript</span>
      </div>

      {/* Node.js */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "150ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#339933">
            <path d="M11.998 0c-.321 0-.641.084-.922.247l-9.167 5.305c-.583.337-.916.965-.916 1.638v10.62c0 .673.333 1.301.916 1.638l9.167 5.305c.281.163.601.247.922.247.321 0 .641-.084.922-.247l9.167-5.305c.583-.337.916-.965.916-1.638V7.19c0-.673-.333-1.301-.916-1.638L12.92.247C12.639.084 12.319 0 11.998 0zm0 1.342c.134 0 .268.035.386.103l9.167 5.305c.237.137.386.39.386.665v10.62c0 .275-.149.528-.386.665l-9.167 5.305c-.118.068-.252.103-.386.103-.134 0-.268-.035-.386-.103l-9.167-5.305c-.237-.137-.386-.39-.386-.665V7.415c0-.275.149-.528.386-.665l9.167-5.305c.118-.068.252-.103.386-.103z"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Node.js</span>
      </div>

      {/* NestJS */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "200ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#E0234E">
            <path d="M14.131.047c-.173 0-.334.037-.483.087.316.21.49.49.576.806.007.043.019.074.025.117a.681.681 0 0 1 .013.112c.024.545-.143.95-.488 1.407a.52.52 0 0 0-.04.069c-.015.035-.031.066-.036.096a1.56 1.56 0 0 0-.021.119 1.093 1.093 0 0 0-.014.112c-.024.545.143.95.488 1.407.007.016.014.031.021.052l.034.056c.168.27.411.519.75.731a.91.91 0 0 0 .487.119h.006c.057 0 .113-.006.168-.02.316-.086.548-.32.688-.61l.017-.036a1.468 1.468 0 0 0 .087-.36c.007-.046.01-.091.01-.135-.001-.098-.011-.193-.025-.287l-.023-.136a3.305 3.305 0 0 0-.149-.657c-.03-.078-.062-.153-.099-.226-.024-.047-.049-.094-.078-.14a1.843 1.843 0 0 0-.17-.263c-.091-.12-.185-.227-.296-.312a1.632 1.632 0 0 0-.41-.228 1.24 1.24 0 0 0-.328-.065zm-.406 4.963c-.037.023-.075.043-.118.06a1.08 1.08 0 0 1-.47.076c-.124 0-.246-.028-.362-.082a.942.942 0 0 1-.278-.196.943.943 0 0 1-.142-.179.632.632 0 0 1-.045-.094l-.009-.02a.57.57 0 0 1-.032-.113 1.493 1.493 0 0 1-.016-.185c-.001-.064.003-.13.013-.195.011-.085.032-.169.062-.25a.902.902 0 0 1 .144-.28c.082-.103.182-.191.295-.256.062-.036.128-.065.197-.087a.814.814 0 0 1 .202-.032c.116-.001.232.021.343.065.109.043.21.107.293.191a.962.962 0 0 1 .243.403c.035.128.052.261.051.394a1.038 1.038 0 0 1-.035.246 1.043 1.043 0 0 1-.098.235.936.936 0 0 1-.154.195.887.887 0 0 1-.198.146z"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">NestJS</span>
      </div>

      {/* Tailwind CSS */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "250ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#06B6D4">
            <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6m-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Tailwind</span>
      </div>

      {/* Prisma */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "300ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12">
            <path fill="#2D3748" d="M21.807 18.285L13.553.757a1.324 1.324 0 0 0-1.129-.754 1.324 1.324 0 0 0-1.131.754l-8.25 17.528a1.324 1.324 0 0 0 .228 1.485 1.324 1.324 0 0 0 1.438.326l8.362-2.954a1.324 1.324 0 0 0 .827-1.227V15.915a1.324 1.324 0 0 1 .827-1.227l2.362-.835a1.324 1.324 0 0 1 1.664.917 1.324 1.324 0 0 1-.08.981l-4.25 9.031a1.324 1.324 0 0 0 .228 1.485 1.324 1.324 0 0 0 1.438.326l8.362-2.954a1.324 1.324 0 0 0 .827-1.227V18.285z"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Prisma</span>
      </div>

      {/* PostgreSQL */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "350ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#336791">
            <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-.7122-.1795a.5268.5268 0 0 0-.2098.3914c-.0246.3864.3292.6895.6896.6564a.538.538 0 0 0 .2601-.1444.5335.5335 0 0 0 .0286-.6048zm-1.3301-.1985a.1582.1582 0 0 0-.0313-.0818.5772.5772 0 0 0-.4729-.2373c-.3047 0-.5843.2188-.6539.5014a.5527.5527 0 0 0 .3245.6298.5523.5523 0 0 0 .6289-.3254.5523.5523 0 0 0 .1564-.3219.5577.5577 0 0 0-.0517-.1648z"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">PostgreSQL</span>
      </div>

      {/* Docker */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "400ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#2496ED">
            <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.09-.248-1.827-1.419-2.91-2.069-3.306a.185.185 0 00-.249.063l-.427.708a.185.185 0 00.06.249c.16.103.809.565.92 1.593a.185.185 0 01-.185.208H7.113a.185.185 0 00-.185.185v.519c0 .902-.31 1.662-.92 2.257-.577.564-1.368.87-2.29.87a.185.185 0 00-.184.186v.543c0 .946.348 1.754.997 2.328.576.51 1.328.766 2.235.766h11.993c1.653 0 3.024-.595 4.058-1.764.987-1.112 1.486-2.589 1.486-4.389a.185.185 0 00-.075-.149"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Docker</span>
      </div>

      {/* Git */}
      <div className="group relative animate-bounce-in" style={{ animationDelay: "450ms" }}>
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-default">
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#F05032">
            <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.924 3.035 1.837 1.837 0 0 1-2.6 0 1.846 1.846 0 0 1-.404-2.02L12.86 8.955v6.525c.176.086.337.203.487.348a1.848 1.848 0 0 1 0 2.604 1.844 1.844 0 0 1-2.604 0 1.849 1.849 0 0 1 0-2.604c.182-.18.392-.316.617-.388V8.99a1.835 1.835 0 0 1-.996-2.408L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477a1.545 1.545 0 0 0 2.186 0l10.43-10.43a1.544 1.544 0 0 0 0-2.187"/>
          </svg>
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Git</span>
      </div>
    </div>
  );
}
