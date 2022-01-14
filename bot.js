//Создаем объект Telegraf и присваиваем ему модуль telegraf
const { Telegraf, Markup, extra, Context } = require('telegraf');
//Создаем объект бот объекта телеграф и передаем АПИ
const config = require('./config');
const recep = require('./recep_db.json');


function main_menu() {
    return Markup.keyboard([
        ["Завтрак"],
        ["Обед"],
        ["Ужин"]
    ]).resize();
}

function choice() {
    return Markup.keyboard([
        ["Другой рецепт", "Вернуться"]
    ]).resize();
}

function vern() {
    return Markup.keyboard([
        ["Вернуться"]
    ]).resize();
}

function raspred() {
    zavt = [];
    obed = [];
    yzin = [];
    for (i = 0; i < recep.length; i++)
        switch (recep[i]['status']) {
            case ('brea'): zavt.push(recep[i])
                break;
            case ('lunch'): obed.push(recep[i])
                break;
            case ('dinn'): yzin.push(recep[i]) 
                break;
            default: console.log("Chek JSON")
                break;
        }
}

function nach (mas, cont)
{
    cont.replyWithPhoto(mas[0].pic, { caption: `${mas[0].name}\n\nПолный рецепт можете посмотреть по ссылке: ${mas[0].href}` })
            setTimeout(() => cont.reply('Если хотите вернуться к выбору типа блюда нажмите "Вернуться", а если хотите другой рецепт, нажмите "Другой рецепт"', choice()), 1000)
            mas.splice(0, 1)
}

function drug (mas, cont)
{
    if (mas.length!=0){
        sluch = Math.floor(Math.random() * mas.length)
        cont.replyWithPhoto(mas[sluch].pic, {
            caption: `${mas[sluch].name}\n\nПолный рецепт можете посмотреть по ссылке: ${mas[sluch].href}
    \n\nЕсли хотите вернуться к выбору типа блюда нажмите "Вернуться", а если хотите другой рецепт, нажмите "Другой рецепт"` })
        mas.splice(sluch, 1)}
        else cont.reply("Извините, я больше не знаю, что Вам предложить в данном разделе, мои рецепты закончились(", vern())
}

const bot = new Telegraf(config.Token);
raspred();
var oredel;
priv = 'Добро пожаловать!\nЯ Бот-Кулинар, подскажу Вам, что приготовить на завтрак, обед или ужин.\nДля более подробно инструкции работы с ботом введите /help';
bot.start((ctx) => ctx.reply(priv, main_menu()))
bot.help((ctx) => ctx.replyWithHTML(`Доброго времени суток, <i>${ctx.from.first_name}</i>
\nНиже представлена клавиатура с выбором типа блюда: Завтрак, Обед или Ужин. Выберите и нажмите на то, что хотите приготовить. Бот предложит Вам блюдо из выбранно категории.
\nЕсли вы ошиблись с выбором категории блюда, нажмите "Вернуться" на клавиатуре снизу.
\nЕсли Вам не понравится предложенное Ботом блюдо, нажимайте "Другой рецепт" на клавиатуре снизу, пока не найдете понравившееся Вам блюдо. Когда у Бота закончатся рецепты, которые он может Вам предложить, он сообщит  вам об этом.`, main_menu()))
bot.on('sticker', (ctx) => ctx.reply('Классный стикер'))
bot.on('voice', (ctx) => ctx.reply('Я пока не умею реагировать на голосовые сообщения'))
bot.on('text', (ctx) => {
    switch (ctx.message.text) {
        case ("Завтрак"): oredel = "Завтрак"; nach(zavt, ctx); break;
        case ("Обед"): oredel = "Обед"; nach(obed, ctx); break;
        case ("Ужин"): oredel = "Ужин"; nach(yzin, ctx); break;
        case ("Вернуться"): ctx.reply('Выберите тип блюда еще раз', main_menu()); raspred(); break;
        case ("Другой рецепт"):
            switch (oredel) {
                case ("Завтрак"): drug(zavt, ctx); break;
                case ("Обед"): drug(obed, ctx); break;
                case ("Ужин"): drug(yzin, ctx); break;
            }
    }
}
)
bot.launch();
