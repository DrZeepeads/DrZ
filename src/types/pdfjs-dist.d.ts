declare module 'pdfjs-dist' {
  type PDFDocumentProxy = {
    numPages: number;
    getPage: (pageNum: number) => Promise<PDFPageProxy>;
  };

  type PDFPageProxy = {
    getTextContent: () => Promise<PDFTextContent>;
  };

  type PDFTextContent = {
    items: Array<{ str: string }>;
  };

  export const getDocument: (
    src: string | { url: string }
  ) => { promise: Promise<PDFDocumentProxy> };
}