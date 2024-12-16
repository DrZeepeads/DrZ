import * as pdfjs from 'pdfjs-dist';

export async function loadPDFData(url: string): Promise<string> {
  const pdf = await pdfjs.getDocument(url).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    fullText += strings.join(' ') + '\n';
  }

  return fullText;
}

