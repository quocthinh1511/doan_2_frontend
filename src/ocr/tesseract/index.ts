import Engine from '../engine';
import Tesseract, { createWorker } from 'tesseract.js';

class TesseractEngine extends Engine {
  private worker: Tesseract.Worker = null as unknown as Tesseract.Worker;

  constructor() {
    super('Tesseract');
  }

  async init(): Promise<void> {
    this.worker = await createWorker({
      logger: (m) => console.log(m)
    });
    /** You can load more languages in advance, but use only part of them in Worker.initialize() */
    await this.worker.loadLanguage('vie+chi_sim');
    await this.worker.initialize('vie+chi_sim');
  }

  async recognize(imageUrl: string): Promise<string> {
    const {
      data: { text }
    } = await this.worker.recognize(imageUrl);
    return text;
  }
}

export default TesseractEngine;

// (async () => {
//   /** You can load more languages in advance, but use only part of them in Worker.initialize() */
//   await worker.loadLanguage('eng+chi_sim');
//   await worker.initialize('eng+chi_sim');
// })();

// export const recognize = async (imageUrl: string) => {
//   const {
//     data: { text }
//   } = await worker.recognize(imageUrl);
//   return text;
// };
