import puppeteer from "puppeteer";

const BASE_URL = 'https://portalbelohorizonte.com.br';
const SCRAPE_URL = `${BASE_URL}/carnaval/2024/programacao/bloco-de-rua`;


export const blocosDerua = async () => {
    const browser = await puppeteer.launch({ headless: false });
    try {
      const page = await browser.newPage();
  
      await page.goto(SCRAPE_URL);
      await page.setViewport({ width: 1080, height: 1024 });
  
      let hasNextPage = true;
      let results: Array<any> = [];
  
      while (hasNextPage) {
        const pageResults = await page.$$eval(
          '.item-columns .favorito-icon',
          divs =>
            divs.map(div => {
              const title = div.getAttribute('data-titulo');
              const date = div.getAttribute('data-data');
              const time = div.getAttribute('data-hora');
              const address = div.getAttribute('data-local');
              const link = 'https://portalbelohorizonte.com.br' + div.getAttribute('data-url');
  
              return {
                title,
                date,
                time,
                address,
                link,
              };
            })
        );
  
        results = results.concat(pageResults);
  
        const nextPageButton = await page.$('.pager__item.pager__item--next a');
        if (nextPageButton) {
          await nextPageButton.click();
          await page.waitForNavigation();
        } else {
          hasNextPage = false;
        }
      }
  
      return results;
    } catch (e) {
      console.error(e);
    } finally {
      await browser.close();
    }
  };
  
  export default blocosDerua;