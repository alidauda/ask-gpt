'use client';
import { PDFType, getPdfurl } from '@/helpers/getPdfurl';
import chatbot from '@/images/chat-bot-svgrepo-com.svg';
import Image from 'next/image';
import { pdfjs, Document, Page } from 'react-pdf';
import { useEffect, useState } from 'react';
import Circular from '../circular';
import './sample.css';

export default function LeftBar({ url }: { url: string }) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString();
  const [windowSize, setWindowSize] = useState<number>(250);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    console.log('document loaded with:', numPages);
    setNumPages(numPages);
  }
  const [pdfType, setpdfType] = useState<PDFType>();
  useEffect(() => {
    getpdfType();
    function handleResize() {
      // Set window width/height to state
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getpdfType = async () => {
    try {
      const pdfType = await getPdfurl(url);
      if (pdfType) setpdfType(pdfType);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='w-[30vw] flex flex-col justify-start items-center bg-[#fffaf8]'>
      {(pdfType?.url && (
        <div className=''>
          <div className='Example__container  h-[85vh] overflow-y-scroll '>
            <div className='Example__container__document '>
              <Document
                file={pdfType?.url}
                onLoadSuccess={onDocumentLoadSuccess}
                className={'w-[25vw]'}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    width={windowSize * 0.25}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ))}
              </Document>
            </div>
          </div>
          {/* <Document  onLoadSuccess={onDocumentLoadSuccess} className={"h-[50vh]"} >
        <Page pageNumber={pageNumber} />
      </Document> */}
        </div>
      )) || (
        <div>
          <Circular />
        </div>
      )}
    </div>
  );
}
