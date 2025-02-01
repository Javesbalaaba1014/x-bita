export const generateWalletAddress = (): string => {
  const prefix = '0x';
  const characters = '0123456789abcdef';
  const length = 40;
  let address = prefix;
  
  for (let i = 0; i < length; i++) {
    address += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return address;
}; 