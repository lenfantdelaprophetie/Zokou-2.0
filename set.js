const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0V0bGdwcmdBeFJSQnB6UEQ0K0xVWnQ3MVMyV2JsQ3hHSzBLbHBxUzNHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkV3QWFYdEVDL0lJbE5odkpocDZmdVI1dnY1U0drNFovbWhUcmRHZVREaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJR3RDRDJ3Um1wVWY1WFlzVmZpc0VZODFsdytRUGpIb2RBZkxuUlBBVDNBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLVDlPVDdkREtPVzQyT2lmNlpPMSsvejdlVjNvcFdTSWJ3QUtBVjhJd1hBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFOMHcwZmQzTytvMXVPMmNDaWoveGNJWm9PM0ZoQ3N2eGxidldmL0lVSDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhJMWR1aERLN2RQSTFudkJjeUloQXZuV3dmbldXSFJkRFM1QS8wUjArZ2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUIyMExyZm5zVGRFY0UxaUlIeU9wMlNRZGs5WEdnZ1RmR1hSTTB4WjhuTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWmlWc2lGdWhLamZiY2d5aHI0ekUySklVVGNlbjJvU1BKbGs4ejRzZTZpZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikt3UlFzRGJGQWYySEZMOUZnNnhGaElLaU5qWk9SeW5OM0ZIb0NnNmVJTW1naGtRVWxseTNKVlhsNjJ2K09va01McVZOWHo5WFVCS251ek5BSXQxSWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA0LCJhZHZTZWNyZXRLZXkiOiJzQ1Q2OU5uRXRBaVV3bnczdW5Wc2dsdnphZmk5dkNCcm9rK052REVjak00PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZjJTLUQ1cGRUMkNMX3ZVdzhrTmpFZyIsInBob25lSWQiOiI0NmQ4ZDg5ZC1hYzYzLTRmODYtYjFmMy0zM2E5MDcwMzQxNGUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVHhIektlRzFvbHFTZnhHN2dUM2hZKzUyQ0c4PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlgzYjFIN0NqSkoyNGVObnNLbHRVcWFkZkluWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJCN01IRDJZVyIsIm1lIjp7ImlkIjoiMjI4OTM2NTg5NTE6MzZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xqdTA3a0VFSVAwOXJjR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZNbTROQkF1UFJsL2ltSHlOU2hSTUtPUGcxbGRHY3RMZFFzcS8wSWFIbFU9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImNTeU9GU1VJT1pzTm44WUwxcVJURW9MUkl0R0I4dHU4SlFTY1lFVmRvbU1hN2pOQ3dtbDZZYUQvUnFDbDBsVk5raFNYVVdxSTAydmhDS1IwWm40YkRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJJSGNkamV6dnlJREM2U0ZjYzFscHY5NnVYQzh1eThrUEdsM24rOVhxS0laVW9WVVJ6bXE0aG5majVwektyTzJYQXVwSGVyNXJkbTB2MXN4aW5VOWdpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyODkzNjU4OTUxOjM2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlh6SnVEUVFMajBaZjRwaDhqVW9VVENqajROWlhSbkxTM1VMS3Y5Q0doNVYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "𝙈𝙍. 𝙇𝙄𝙀𝘽𝙀𝙍𝙏",
    NUMERO_OWNER : process.env.22893658951,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PRIVÉ,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || '𝙈𝙍. 𝙇𝙄𝙀𝘽𝙀𝙍𝙏',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.9d05ccc5f58e1cf30937 ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'oui',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
