"use client";


import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { Mail, Music, Pause, ChevronsDown, Slash } from "lucide-react";
import { Clock, MapPin } from "lucide-react";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ weight: "600", subsets: ["latin"] });



export default function Home() {

// BACKSOUND
const audioRef = useRef(null);
const [isPlaying, setIsPlaying] = useState(false);


  // STATE UTAMA
  const [mounted, setMounted] = useState(false); // cek hydration
  const [loading, setLoading] = useState(true); // loading screen
  const [opened, setOpened] = useState(false); 
  const [coverLeaving, setCoverLeaving] = useState(false);

  // SLIDE 1
  const [showSlide1, setShowSlide1] = useState(false);
  const [animateGreeting, setAnimateGreeting] = useState(false);
  const [animateNames, setAnimateNames] = useState(false);
  const [animateDate, setAnimateDate] = useState(false);
  const [animateCountdown, setAnimateCountdown] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);

  // SLIDE 2
  const [showSlide2, setShowSlide2] = useState(false);

  // COUNTDOWN
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
// Wedding date untuk countdown
const weddingDate = new Date("2025-12-27T09:00:00");

  // HYDRATION & LOADING
  useEffect(() => {
    setMounted(true);

    // Simulasikan loading sebelum cover muncul
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5 detik, bisa disesuaikan

    return () => clearTimeout(timer);
  }, []);

  // Lock scroll sebelum buka undangan
  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
  }, [opened]);

  // HANDLE BUKA COVER
  const handleOpen = () => {
    setCoverLeaving(true);
    setTimeout(() => {
      setShowSlide1(true);

      setTimeout(() => setAnimateGreeting(true), 300);
      setTimeout(() => setAnimateNames(true), 800);
      setTimeout(() => setAnimateDate(true), 1300);
      setTimeout(() => setAnimateCountdown(true), 1800);
      setTimeout(() => setAnimateButton(true), 2300);
    }, 50);

    setTimeout(() => setOpened(true), 700);
  };

// Countdown real-time
useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate.getTime() - now;

    if (distance < 0) {
      clearInterval(interval);
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown({ days, hours, minutes, seconds });
  }, 1000);

  return () => clearInterval(interval);
}, [weddingDate]);

// Add to Google Calendar
const addToGoogleCalendar = () => {
  // Tanggal mulai: 27 Desember 2025, jam 09.00 WIB
  const startDate = new Date("2025-12-27T09:00:00");
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // +2 jam

  const start = startDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const title = encodeURIComponent("Wedding Jujum & Putri");
  const details = encodeURIComponent("We invited you to celebrate our wedding!");
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;

  window.open(url, "_blank");
};


  // Scroll detection untuk slide2
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      if (scrollY > viewportHeight * 0.5) {
        setShowSlide2(true);
      } else {
        setShowSlide2(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

// SLIDE 3 Animasi
  const [animateSlide3, setAnimateSlide3] = useState(false);
  const slide3Ref = useRef(null);

  // Scroll detection untuk Slide 3
  useEffect(() => {
    const handleScroll = () => {
      if (!slide3Ref.current) return;
      const rect = slide3Ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Trigger animasi ketika setengah slide3 terlihat
      if (rect.top < windowHeight * 0.7) {
        setAnimateSlide3(true);
      } else {
        setAnimateSlide3(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

// Tambahkan state animasi Slide 4
const [animateSlide4, setAnimateSlide4] = useState(false);
const slide4Ref = useRef(null);

// Scroll detection untuk Slide 4
useEffect(() => {
  const handleScroll = () => {
    if (!slide4Ref.current) return;
    const rect = slide4Ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.7) {
      setAnimateSlide4(true);
    } else {
      setAnimateSlide4(false);
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// SLIDE 5 Animasi (jika ingin pakai animasi muncul saat scroll)
const [animateSlide5, setAnimateSlide5] = useState(false);
const slide5Ref = useRef(null);

// Scroll detection untuk Slide 5
useEffect(() => {
  const handleScroll = () => {
    if (!slide5Ref.current) return;
    const rect = slide5Ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.7) {
      setAnimateSlide5(true);
    } else {
      setAnimateSlide5(false);
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

//Slide 7 Animasi
const slide7Ref = useRef(null);
const [animateSlide7, setAnimateSlide7] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (!slide7Ref.current) return;
    const rect = slide7Ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.8) { // ketika 80% terlihat
      setAnimateSlide7(true);
    } else {
      setAnimateSlide7(false);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


// SLIDE 6 Animasi
const [animateSlide6, setAnimateSlide6] = useState(false);
const slide6Ref = useRef(null);

// Scroll detection untuk Slide 6
useEffect(() => {
  const handleScroll = () => {
    if (!slide6Ref.current) return;
    const rect = slide6Ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.7) {
      setAnimateSlide6(true);
    } else {
      setAnimateSlide6(false);
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// PLAY MUSIC
const startMusic = () => {
  if (audioRef.current) {
    audioRef.current.play();
    setIsPlaying(true);
  }
};

// PAUSE MUSIC
const toggleMusic = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }

  setIsPlaying(!isPlaying);
};


// STATE UI
const [autoScroll, setAutoScroll] = useState(false);

// REFS
const autoScrollRef = useRef(false);
const isUserScrollingRef = useRef(false);
const scrollAnimationRef = useRef(null);
const resumeTimerRef = useRef(null);

// LOOP AUTO-SCROLL (SUPER HALUS)
const smoothScrollLoop = () => {
  if (autoScrollRef.current && !isUserScrollingRef.current) {
    window.scrollBy(0, 1.2); // 1.2px/frame = ±72px/s → paling smooth
  }
  scrollAnimationRef.current = requestAnimationFrame(smoothScrollLoop);
};

// START
const startAutoScroll = () => {
  if (autoScrollRef.current) return;

  autoScrollRef.current = true;
  setAutoScroll(true);

  scrollAnimationRef.current = requestAnimationFrame(smoothScrollLoop);
};

// STOP
const stopAutoScroll = () => {
  autoScrollRef.current = false;
  setAutoScroll(false);

  if (scrollAnimationRef.current) {
    cancelAnimationFrame(scrollAnimationRef.current);
    scrollAnimationRef.current = null;
  }

  if (resumeTimerRef.current) {
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = null;
  }

  isUserScrollingRef.current = false;
};

// TOGGLE BUTTON
const toggleAutoScroll = () => {
  if (autoScrollRef.current) stopAutoScroll();
  else startAutoScroll();
};

// DETECT USER SCROLL (tanpa konflik)
// hanya gunakan wheel + touchmove → lebih akurat & tidak patah
useEffect(() => {
  const handleUserScroll = () => {
    if (!autoScrollRef.current) return;

    isUserScrollingRef.current = true;

    // reset timer
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    // user berhenti scroll 200ms → lanjut auto-scroll
    resumeTimerRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 200);
  };

  window.addEventListener("wheel", handleUserScroll, { passive: true });
  window.addEventListener("touchmove", handleUserScroll, { passive: true });

  return () => {
    window.removeEventListener("wheel", handleUserScroll);
    window.removeEventListener("touchmove", handleUserScroll);
  };
}, []);

// Cleanup
useEffect(() => {
  return () => stopAutoScroll();
}, []);

  if (!mounted) return null; // cegah flicker SSR

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-cream">
      {/* LOADING SCREEN */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-cream">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-600 border-b-4 border-gray-200"></div>
        </div>
      )}

      {/* COVER */}
      {!opened && !loading && (
        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6
          transition-all duration-700
          ${coverLeaving ? "-translate-y-full opacity-0 scale-95" : "translate-y-0 opacity-100 scale-100"}`}
        >
          <div className="absolute inset-0">
            <Image
              src="/images/cover.png"
              alt="background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 animate-fadein">
            <p className={`${playfair.className} text-lg tracking-widest text-gray-700 mb-4`}>
              THE WEDDING OF
            </p>
            <h1 className={`${greatVibes.className} text-6xl md:text-7xl text-rose-700 drop-shadow-lg`}>
              Jujum <br /> &amp; <br /> Putri
            </h1>
<button
  onClick={() => {
    handleOpen();   // buka undangan
    startMusic();   // mulai musik
    startAutoScroll(); // mulai auto scroll
  }}
  className="mt-10 px-8 py-3 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 transition-all flex items-center gap-2"
>
  <Mail size={20} /> Buka Undangan
</button>
          </div>
        </div>
      )}

      {/* SLIDE 1 */}
      {opened && showSlide1 && (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-32 z-20">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/slide2.png"
              alt="Slide 1 Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <p className={`text-lg md:text-xl tracking-widest text-gray-700 mb-4 transform transition-all duration-700 ${animateGreeting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <b>WE INVITED YOU <br /> TO CELEBRATE OUR WEDDING</b>
          </p>

          <h1 className={`${greatVibes.className} text-5xl md:text-6xl text-rose-700 drop-shadow-lg mb-4 transform transition-all duration-700 ${animateNames ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Jujum &amp; Putri
          </h1>

          <p className={`${playfair.className} text-lg md:text-xl text-gray-700 mb-6 transform transition-all duration-700 ${animateDate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Sabtu, 27 Desember
          </p>

          <div className={`flex gap-6 text-center mb-8 transform transition-all duration-700 ${animateCountdown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div>
              <p className="text-3xl font-bold text-rose-700">{countdown.days}</p>
              <span className="text-gray-700">Hari</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-rose-700">{countdown.hours}</p>
              <span className="text-gray-700">Jam</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-rose-700">{countdown.minutes}</p>
              <span className="text-gray-700">Menit</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-rose-700">{countdown.seconds}</p>
              <span className="text-gray-700">Detik</span>
            </div>
          </div>

          <button
            onClick={addToGoogleCalendar}
            className={`px-6 py-3 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 transition-all transform duration-700 ${animateButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Simpan tanggal
          </button>
        </div>
      )}

      {/* SLIDE 2 */}
      {opened && (
        <div className="relative w-full flex justify-center z-10 bg-cream py-20">
          <div className="relative w-full max-w-5xl aspect-square flex items-center justify-center px-16 py-10">
            <Image
              src="/images/bg1.png"
              alt="Slide 2 Background"
              fill
              className="object-cover"
              priority
            />
            <p
              className={`text-center text-gray-700 text-sm md:text-base max-w-lg leading-relaxed italic transform transition-all duration-700
                ${showSlide2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              "Dan diantara tanda-tanda kebesaran-Nya ialah diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri supaya kamu mendapatkan ketenangan hati dan dijadikan-Nya kasih sayang diantara kamu sesungguhnya yang demikian menjadi tanda-tanda kebesaran-Nya bagi orang-orang yang berfikir"
            </p>
          </div>
        </div>
      )}
      
{/* SLIDE 3 */}
      {opened && (
        <div
          ref={slide3Ref}
          className="relative w-full min-h-screen flex flex-col items-center justify-center bg-cream px-4 md:px-6 pt-24 pb-32 z-20"
        >
          {/* Background Slide 3 */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/slide3.png"
              alt="Slide 3 Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Top Decorative Curve */}
          <div className="absolute top-0 left-0 w-full -z-0">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-32"
              preserveAspectRatio="none"
            >
              <path
                fill="#f7f3ef"
                d="M0,80 C360,0 1080,160 1440,80 L1440,0 L0,0 Z"
              />
            </svg>
          </div>

          {/* Overlay oval blur */}
          <div className="relative z-10 flex items-center justify-center w-full">
            <div
              className={`bg-white/40 backdrop-blur-lg rounded-[2rem] p-8 md:p-12 max-w-md md:max-w-3xl flex flex-col items-center text-center
                transition-all duration-700 transform
                ${animateSlide3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {/* Nama Mempelai Pria */}
              <h2
                className={`${greatVibes.className} text-3xl md:text-5xl text-rose-700 mb-2
                  transition-all duration-700 transform
                  ${animateSlide3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
              >
                Ujang <br/> Jujum
              </h2>
              <p
                className={`${playfair.className} text-sm md:text-lg text-gray-700 mb-4
                  transition-all duration-700 transform delay-150
                  ${animateSlide3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
              >
                Putra ke 2 dari : <br /> Bapak M. Alpian &amp; Ibu Yanti
              </p>

              {/* "&" sebagai pemisah */}
              <span
                className={`${greatVibes.className} text-3xl md:text-4xl text-rose-700 my-4
                  transition-all duration-700 delay-300
                  ${animateSlide3 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
              >
                &amp;
              </span>

              {/* Nama Mempelai Wanita */}
              <h2
                className={`${greatVibes.className} text-3xl md:text-5xl text-rose-700 mb-2
                  transition-all duration-700 transform delay-400
                  ${animateSlide3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
              >
                Nenden <br/>Padliana Putri
              </h2>
              <p
                className={`${playfair.className} text-sm md:text-lg text-gray-700
                  transition-all duration-700 transform delay-550
                  ${animateSlide3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
              >
                Putri ke 3 dari <br /> Bapak Alm. Ahmad Junaedi Bukhori &amp; Ibu Nunung Mintarsih
              </p>
            </div>
          </div>

          {/* Bottom Decorative Curve */}
          <div className="absolute bottom-0 left-0 w-full -z-0">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-32"
              preserveAspectRatio="none"
            >
              <path
                fill="#f7f3ef"
                d="M0,80 C360,0 1080,160 1440,80 L1440,120 L0,120 Z"
              />
            </svg>
          </div>
        </div>
      )}

{/* SLIDE 4 */}
{opened && (
  <div
    ref={slide4Ref}
    className="relative w-full flex flex-col items-center justify-center bg-cream px-4 md:px-6 py-32 z-20"
  >
    {/* ORNAMEN ATAS */}
    <div
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl transition-all duration-700 transform
        ${animateSlide4 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      style={{ pointerEvents: "none" }}
    >
      <Image
        src="/images/top.png"
        alt="Ornamen Top"
        width={600}
        height={100}
        className="mx-auto"
        priority
      />
    </div>

    {/* Spacer supaya konten tidak tertutup ornamen */}
    <div className="h-8 md:h-16"></div>

    <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 z-10">
      {/* AKAD NIKAH */}
      <div
        className={`flex-1 bg-white/95 shadow-lg backdrop-blur-lg rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center
          transition-all duration-700 transform
          ${animateSlide4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className={`${greatVibes.className} text-3xl md:text-4xl text-rose-700 mb-4`}>
          Akad Nikah
        </h2>
        <p className={`${playfair.className} text-lg md:text-xl text-gray-700 mb-2`}>
        <u>SUDAH DILAKSANAKAN</u><br/> Sabtu, 20 Desember 2025
        </p>

        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <Clock className="w-5 h-5 text-rose-700" />
          <span>Jam: 08.00 WIB s/d Selesai</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-5 h-5 text-rose-700" />
          <span>Kediaman mempelai wanita</span>
        </div>
      </div>

      {/* RESEPSI */}
      <div
        className={`flex-1 bg-white/95 shadow-lg backdrop-blur-lg rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center
          transition-all duration-700 transform
          ${animateSlide4 ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-10"}`}
      >
        <h2 className={`${greatVibes.className} text-3xl md:text-4xl text-rose-700 mb-4`}>
          Resepsi : Ngunduh Mantu
        </h2>
        <p className={`${playfair.className} text-lg md:text-xl text-gray-700 mb-2`}>
          Sabtu, 27 Desember 2025
        </p>

        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <Clock className="w-5 h-5 text-rose-700" />
          <span>Jam: 09.00 WIB s/d Selesai</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-5 h-5 text-rose-700" />
          <span>Kp.Penceling RT. 04/ RW. 02 Desa Kutajaya Kec. Cicurug Kab. Sukabumi</span>
        </div>
      </div>
    </div>

    {/* SALAM HORMAT */}
    <div
      className={`mt-12 bg-white/95 shadow-lg backdrop-blur-lg rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center
        transition-all duration-700 transform
        ${animateSlide4 ? "opacity-100 translate-y-0 delay-400" : "opacity-0 translate-y-10"}`}
    >
      <p className={`${playfair.className} text-md md:text-xl text-gray-700 mb-4`}>
        Merupakan suatu kehormatan dan kebahagiaan dari kami apabila, Bapak / Ibu / Saudara / i, berkenan hadir untuk memberikan do'a restunya, kami ucapkan terimakasih.
      </p>
      <p className={`${playfair.className} text-lg md:text-xl text-gray-700`}>
        Hormat kami
      </p>
      <h2 className={`${greatVibes.className} text-3xl md:text-4xl text-rose-700 mt-4`}>
        Jujum &amp; Putri
      </h2>
    </div>

    {/* ORNAMEN BAWAH */}
    <div
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl transition-all duration-700 transform
        ${animateSlide4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ pointerEvents: "none" }}
    >
      <Image
        src="/images/bottom.png"
        alt="Ornamen Bottom"
        width={600}
        height={100}
        className="mx-auto"
        priority
      />
    </div>
  </div>
)}

{/* SLIDE 5 */}
{opened && (
  <div
    ref={slide5Ref}
    className="relative w-full flex flex-col items-center justify-center bg-cream px-4 md:px-6 py-32 z-20"
  >
    {/* Judul Slide */}
    <h2
      className={`${greatVibes.className} text-4xl md:text-5xl text-rose-700 mb-6 text-center`}
    >
      Lokasi Acara
    </h2>

    {/* Box Informasi + Maps */}
    <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 z-10">
      <div className={`flex-1 bg-white/95 shadow-lg backdrop-blur-lg rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center
  transition-all duration-700 transform
  ${animateSlide5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h3 className={`${greatVibes.className} text-3xl text-rose-700 mb-4`}>
      Resepsi
        </h3>
        <p className={`${playfair.className} text-md text-gray-700 mb-4`}>
          Kp.Penceling RT. 04/ RW. 02 Desa Kutajaya Kec. Cicurug Kab. Sukabumi
        </p>

        {/* Embed Google Maps */}
        <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden">
<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3962.0886226705084!2d106.771665274995!3d-6.759047393237544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNDUnMzIuNiJTIDEwNsKwNDYnMjcuMyJF!5e0!3m2!1sid!2sid!4v1764876018939!5m2!1sid!2sid" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <a
          href="https://maps.app.goo.gl/HuQ7izvSux9qunGz7"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-6 py-3 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 transition-all"
        >
          Buka di Google Maps
        </a>
      </div>
    </div>
  </div>
)}

{/* SLIDE 7 - Penutup Persegi */}
{opened && (
  <div ref={slide7Ref} className="relative w-full flex justify-center z-10 bg-cream py-20">
    <div className="relative w-full max-w-5xl aspect-square flex items-center justify-center px-16 py-10">
      {/* Background Persegi */}
      <Image
        src="/images/bg1.png" // ganti sesuai background persegi slide penutup
        alt="Slide 7 Background"
        fill
        className="object-cover rounded-3xl"
        priority
      />

      {/* Konten Teks Penutup */}
      <p
        className={`text-center text-gray-700 text-lg md:text-xl max-w-lg leading-relaxed italic transform transition-all duration-700
          ${animateSlide7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <b>MOMEN YANG BERHARGA</b>
        <br /><br />
        "Menciptakan kenangan adalah hadiah yang tak ternilai harganya. Kenangan akan bertahan seumur hidup."
      </p>
    </div>
  </div>
)}

{/* SLIDE 6 */}
{opened && (
  <div
    ref={slide6Ref}
    className="relative w-full flex flex-col items-center justify-center bg-cream px-4 md:px-6 py-32 z-20"
  >
    {/* Background Slide */}
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/amplop.png"
        alt="Slide 6 Background"
        fill
        className="object-cover"
        priority
      />
    </div>

    {/* Judul Slide */}
    <h2
      className={`${greatVibes.className} text-4xl md:text-5xl text-rose-700 mb-8 text-center`}
    >
      Amplop Digital
    </h2>

    {/* Teks di luar box (lebih sempit) */}
<p className={`${playfair.className} text-lg md:text-xl text-gray-700 mb-12 text-center max-w-xs mx-auto`}>
  Tanpa mengurangi rasa hormat, <br/>bagi anda yang ingin memberikan tanda kasih kepada kami, dapat melalui :
</p>

    {/* Box Informasi */}
<div
  className={` w-full max-w-md md:max-w-lg lg:max-w-xl bg-white/95 shadow-lg backdrop-blur-lg rounded-[2rem] p-6 md:p-12 flex flex-col items-center text-center
    transition-all duration-700 transform
    ${animateSlide6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
  style={{ marginLeft: "auto", marginRight: "auto" }}
>
  {/* Ganti teks dengan logo BSI */}
  <div className="mb-0 mt-[-40px]">
    <Image
      src="/images/bsi.png"
      alt="Logo Bank BSI"
      width={180}       // sesuaikan ukuran
      height={10}       // sesuaikan ukuran
      className="object-contain"
      priority
    />
  </div>

  <p
    className="text-2xl md:text-3xl font-bold text-rose-700 mt-[-48px] mb-2"
    id="rekeningNumber"
  >
    7301992674
  </p>

  <p className="text-lg md:text-xl text-gray-700 mb-6">
    Atas nama: <b>Ujang Jujum</b>
  </p>

  {/* Tombol Salin */}
  <button
    onClick={() => {
      navigator.clipboard.writeText("7301992674");
      alert("Nomor rekening telah disalin!");
    }}
    className="px-6 py-3 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 transition-all"
  >
    Salin Nomor Rekening
  </button>
</div>
  </div>
)}


{/* CREATED BY */}
{opened && (
  <div className="w-full text-center text-sm md:text-base text-gray-500 py-6">
    {/* Garis pemisah di atas */}
    <div className="w-32 h-[1px] bg-gray-700 mx-auto mb-3"></div>
    Created by <b>Ezearl</b>
  </div>
)}

<audio ref={audioRef} src="/music/musik.mp3" loop preload="auto"></audio>

{opened && (
  <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[9999]">

    {/* Tombol Musik */}
    <button
      onClick={toggleMusic}
      className="w-12 h-12 bg-white/80 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center"
    >
      {isPlaying ? (
        <Pause size={22} className="text-rose-600" />
      ) : (
        <Music size={22} className="text-rose-600" />
      )}
    </button>

    {/* Tombol Auto Scroll */}
    <button
      onClick={toggleAutoScroll}
      className="w-12 h-12 bg-white/80 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center"
    >
      {autoScroll ? (
        <ChevronsDown size={22} className="text-rose-600" />
      ) : (
        <Slash size={22} className="text-rose-600" />
      )}
    </button>

  </div>
)}
    </div>
  );
}
