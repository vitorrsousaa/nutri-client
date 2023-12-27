import { useRef, useState } from 'react';

import JsPDF from 'jspdf';

export function useGeneratePDF() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePDF = async (name: string) => {
    setIsLoading(true);
    const report = new JsPDF('portrait', 'px', 'a4');

    const newElement = elementRef.current?.cloneNode(true) as HTMLElement;
    newElement.style.width = '800px';
    newElement.style.display = 'flex';

    await report.html(newElement, {
      margin: 16,
      html2canvas: {
        scale: 0.5,
      },
    });

    report.save(`${name}.pdf`);
    setIsLoading(false);
  };

  return {
    exportElementRef: elementRef,
    generatePDF: generatePDF,
    isGeneratingPDF: isLoading,
  };
}
