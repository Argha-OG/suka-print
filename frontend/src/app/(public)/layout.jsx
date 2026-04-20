import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PublicLayout({ children }) {
  return (
    <>
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-blue/5 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-magenta/5 rounded-full blur-[150px]"></div>
      </div>

      <Navbar />

      <main className="flex-1 w-full pt-[140px] md:pt-[160px] relative">
          {children}
      </main>

      <Footer />
    </>
  );
}
