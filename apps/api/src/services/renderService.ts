import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { uploadToS3 } from './storageService.js';

const getBrowser = async () => {
    if (process.env.VERCEL) {
        const chromiumAny = chromium as any;
        return await puppeteerCore.launch({
            args: chromiumAny.args,
            defaultViewport: chromiumAny.defaultViewport,
            executablePath: await chromiumAny.executablePath(),
            headless: chromiumAny.headless,
        });
    }
    return await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
};

export const generatePdf = async (html: string) => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 1400 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await (page as any).pdf({ 
      width: '1000px', 
      height: '1400px', 
      printBackground: true 
  });
  await browser.close();
  return pdf;
};

export const generateImage = async (html: string) => {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 1400 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const image = await page.screenshot({ fullPage: true, type: 'png' });
    await browser.close();
    return image;
};

export const renderAndUpload = async (html: string, orderId: string, type: 'pdf' | 'png') => {
    const buffer = type === 'pdf' ? await generatePdf(html) : await generateImage(html);
    const fileName = `invites/${orderId}.${type}`;
    const contentType = type === 'pdf' ? 'application/pdf' : 'image/png';
    const url = await uploadToS3(buffer as Buffer, fileName, contentType);
    return url;
};
