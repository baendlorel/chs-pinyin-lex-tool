import { readFileSync, statSync } from 'fs';
const path = '/mnt/c/Users/80652/AppData/Roaming/Microsoft/InputMethod/Chs/ChsPinyinEUDPv1 - 副本.lex';
const buf = readFileSync(path);
const size = statSync(path).size;

const startOfOffsets = buf.readUInt32LE(0x10);
const count = buf.readUInt32LE(0x14);
const dataSectionStart = startOfOffsets + count * 4;

console.log('--- Step 2: UInt32 at offsets ---');
[0x10, 0x14, 0x18, 0x1c, 0x20].forEach(off => {
    console.log(`0x${off.toString(16)}: 0x${buf.readUInt32LE(off).toString(16)}`);
});

console.log('\n--- Step 4 & 5: Corrected Parse ---');
const stats = Array(16).fill(0).map(() => new Set());
for (let i = 0; i < 5; i++) {
    const relOffset = buf.readUInt32LE(startOfOffsets + i * 4);
    const absOffset = dataSectionStart + relOffset;
    
    const header = buf.slice(absOffset, absOffset + 16);
    for(let j=0; j<16; j++) stats[j].add(header[j]);

    const pinyinLen = buf.readUInt16LE(absOffset + 16);
    const pinyin = buf.slice(absOffset + 18, absOffset + 18 + pinyinLen).toString('utf16le');
    const textLen = buf.readUInt16LE(absOffset + 18 + pinyinLen);
    const text = buf.slice(absOffset + 20 + pinyinLen, absOffset + 20 + pinyinLen + textLen).toString('utf16le');
    const totalLen = 20 + pinyinLen + textLen;

    console.log(`${i}: Range [0x${absOffset.toString(16)} - 0x${(absOffset + totalLen).toString(16)}], Len ${totalLen}`);
    console.log(`   Header: ${header.toString('hex')}`);
    console.log(`   Pinyin: ${pinyin}, Text: ${text}`);
}

console.log('\n--- Header Variation (First 5) ---');
for(let j=0; j<16; j++) {
    if (stats[j].size > 1) {
        console.log(`Byte ${j}: [${Array.from(stats[j]).map(v => '0x' + v.toString(16).padStart(2, '0')).sort().join(', ')}]`);
    } else {
        console.log(`Byte ${j}: 0x${Array.from(stats[j])[0].toString(16).padStart(2, '0')} (const)`);
    }
}
