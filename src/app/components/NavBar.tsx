import Link from 'next/link';

export default function NavBar() {
  return (
    <div className='py-6 bg-[#B0578D] flex justify-between items-center w-auto px-10 text-4xl text-[#FFFFFF]'>
      <Link
        href='/'
        className='hover:text-purple-200
        '
      >
        <span>PDFChat</span>
      </Link>
    </div>
  );
}
