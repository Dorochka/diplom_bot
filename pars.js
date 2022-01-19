const puppeteer = require('puppeteer')
async function pars(tip) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(tip)
    const obj = [];
    nh = 'href="'
    kh = '" title'
    nj = 'img src="'
    ilinj = 'data-original="'
    kj = '" alt='
    nn = 'alt="'
    kn = '" title="" class="native'
    for (i = 1; i < 100; i++) {
        try{
        await page.waitForSelector(`#cooking > div.cooking-block > div:nth-child(${i})`)
        seldiv = await page.$eval(`#cooking > div.cooking-block > div:nth-child(${i}) > div.photo.is-relative`, (el) => el.innerHTML)
        seldiv = String(seldiv)

        
        inh = seldiv.indexOf(nh) + nh.length
        ikh = seldiv.indexOf(kh)
        href = seldiv.substring(inh, ikh)
        href = 'https://1000.menu' + href

        if (seldiv.includes(ilinj))
        {
            inj = seldiv.indexOf(ilinj) + ilinj.length
        ikj = seldiv.indexOf(kj)
        jpg = seldiv.substring(inj, ikj)
        jpg = 'https:' + jpg
        }
        else{
        inj = seldiv.indexOf(nj) + nj.length
        ikj = seldiv.indexOf(kj)
        jpg = seldiv.substring(inj, ikj)
        jpg = 'https:' + jpg
        }
        
        inn = seldiv.indexOf(nn) + nn.length
        ink = seldiv.indexOf(kn)
        naz = seldiv.substring(inn, ink)
        obj.push({hrefkey: href, pic: jpg, name: naz});
        }
        catch{}
  }
//  console.log(obj[18])
  return(obj)
    await browser.close()
}

zavtrak = pars('https://1000.menu/catalog/na-zavtrak') //Завтрак
obed = pars('https://1000.menu/catalog/supj') //Обед
yzhin = pars('https://1000.menu/catalog/zvanji-uzhin') //Ужин

//console.log(zavtrak)