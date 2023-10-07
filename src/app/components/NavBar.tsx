import Link from 'next/link';

export default function NavBar() {
  return (
    <div className='h-[10vh] bg-[#B0578D] flex justify-between items-center w-auto px-10 text-4xl text-[#FFFFFF]'>
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
