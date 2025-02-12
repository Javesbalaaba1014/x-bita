import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const ca = `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUWRtbLTum8RytcGzuWpsVizXKVV0wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNmQwMzZkZmEtOTk4MS00YjE1LTliOGItNGY3YTY4NWUx
MGViIFByb2plY3QgQ0EwHhcNMjUwMTI0MTUyMDIzWhcNMzUwMTIyMTUyMDIzWjA6
MTgwNgYDVQQDDC82ZDAzNmRmYS05OTgxLTRiMTUtOWI4Yi00ZjdhNjg1ZTEwZWIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBANymw3Od
nWzxdfmACmS2bsTP/9HEnLil0BZJGYcol299eCr1rHz4x7ZCsE/K4zQsoy+gV7A0
xyfZLF2LLrtAruoQVSYWnOGuXWnNumbGjerKk+tH0OoPkX8Hxb496Ep0/hmLbHhH
tBfpAIIL4eRUyFiz/8LrXgprtPsdSpU5sx3NV5E/IuE/Tbx8V3vgPaKTRMCnaPg6
y0auc085OSlp/roN0UYginEdGPJhyL9EHI/mKM2EOW3jRkrwepB1g0bVj6jQyzCn
LnhHp1L148PAOf7ZqoctoMtfn2ew+TpzFNPnZ8L2KUD7WcAFdJ4jbppIoZyP+wVp
hNA5GynYkwxCUBROtHuGKZqJUzRTZgXOfocS1yMCrOgEV14p2Y2UrPB53x4WiAUd
lnSp63jYUmfe9o4F8Aw3LTG9+7tHnFl14vqoha2DOO+LsxRdkink02ej+y+GxbmP
ivd2LQ1kFu+UijB7nh2m81zNC3tQvKvQWax17pR6ftmA47l3CbFMi+/fawIDAQAB
oz8wPTAdBgNVHQ4EFgQU8SPQ5da8p7N78Pt3wKgGDUyq4o4wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAClQmRa14S02mEcL
TJeMYSphnfB19LgM9XgcCz9hneWxynWY/O8w/tv/0/bA5a6MJB/yXEHVRdEE91Ui
f51SBkM27jt6WDMJhdI2rTAU5HlACoFJ9BNlXiM9cZ66I3mnZhjvG3orYV3oAz76
2MULFC+RtIGUFdsZsTRMDUNKL9whX+M7UbTxb9jfQmGnPxW7si4Wwpz+/kWPVUpl
vo6fSpWgNSiWNhS9Prhz6fchnLaY52CkQQClqq5hHYloJ0VVFMtWWK3GhgqEIjLw
kaUnIlPdb08J3oQ2Qr07oKmhrGLjpkKmTZ/ISarY3KIHfgbnWVcgPencxo/a5mNX
Z4N125PomrBPOgYI/FWFUvuuXQNL2SIY9Gc1mM2RUTi5LNumTkD/2c1uAcEv6eIq
21AFnzWlweEp5T7L9LfFwAoQiuz4ScQbKqb12c6H75arzqxSFT1HIIlZQ3FEanrF
9bO5DIUQnV4DBXt7w3quNZnAmzNEPZxeIsJvddKs3oZB3iqEMg==
-----END CERTIFICATE-----`;

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: true,
    ca: ca,
    minVersion: 'TLSv1.2'
  },
  connectTimeout: 20000,
  socketPath: undefined,
  stream: false
}; 