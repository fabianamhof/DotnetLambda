import { APIGatewayEvent } from 'aws-lambda';
import chromium from 'chrome-aws-lambda';
import { Browser, PDFOptions } from 'puppeteer-core';

export interface Parameters {
    url?: string;
    html?: string;
    config?: PDFOptions;
}

const defaultPdfOptions: PDFOptions = {
    landscape: false,
    format: 'a4',
    printBackground: true,
    margin: { bottom: 0, left: 0, right: 0, top: 0 },
};

export async function lambdaHandler(event: APIGatewayEvent) {
    let browser: Browser | undefined = undefined;

    const params = event.body ? (JSON.parse(event.body) as Parameters) : undefined;

    try {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
        });

        const page = await browser!.newPage();

        await page.emulateMediaType('screen');
        if (params && params.html) {
            await page.setContent(params.html, {});
        } else if (params && params.url) {
            await page.goto(params.url);
        } else {
            throw new Error('Invalid parameters\n' + typeof params + JSON.stringify(params));
        }

        const pdf = await page.pdf({ ...defaultPdfOptions, ...params.config });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/pdf',
            },
            body: pdf.toString('base64'),
            isBase64Encoded: true,
        };
    } catch (error) {
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
