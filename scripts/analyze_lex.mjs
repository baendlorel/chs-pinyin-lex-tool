import { readFileSync } from 'fs';

const filePath = '/mnt/c/Users/80652/AppData/Roaming/Microsoft/InputMethod/Chs/ChsPinyinEUDPv1 - 副本.lex';
const buffer = readFileSync(filePath);

function analyze() {
    let offset = 0;
    // Find where the first record like pattern [10 00 .. 01 06] exists near the end of the index
    // The index ends around 0x1A000. Let's start scanning from 0x20000.
    offset = 0x20000;
    const records = [];
    
    while (offset + 16 < buffer.length) {
        // Look for the header signature. 
        // Based on tail: 10 00 (some len) 01 06 00 00 00 00 c2 2a b2 2f
        // Or 10 00 [len_a] 00 [len_b] 00 01 06 00 00 00 00 c2 2a b2 2f
        // Wait, the tail showed: 10 00 28 00 01 06 00 00 00 00 c2 2a b2 2f
        // byte 0: 10? byte 2: length?
        
        if (buffer[offset] === 0x10 && buffer[offset+1] === 0x00 && buffer[offset+4] === 0x01 && buffer[offset+5] === 0x06) {
            const totalLen = buffer.readUInt16LE(offset + 2);
            if (totalLen > 16 && totalLen < 200 && offset + totalLen <= buffer.length) {
                const header = buffer.slice(offset, offset + 16);
                
                // From tail observation:
                // Text seems to follow at some offset? No, Pinyin was first?
                // Sample "zuyifuglyou" (7a 00 75 00 79 00 ...) is "zuyifuglyou"
                // Then 00 00, then "df 79 63 88 0d 67 c5 65 38 6e" which is Chinese
                
                // Let's extract the whole data block
                const data = buffer.slice(offset + 16, offset + totalLen);
                
                records.push({
                    offset,
                    header: header.toString('hex'),
                    headerRaw: header,
                    data: data,
                    totalLen
                });
                
                offset += totalLen;
                if (records.length >= 1000) break;
                continue;
            }
        }
        offset++;
    }

    console.log('Detected Records:', records.length);
    if (records.length === 0) return;

    // Byte Stats
    const byteStats = Array.from({length: 16}, () => ({}));
    records.forEach(r => {
        for (let i = 0; i < 16; i++) {
            const val = r.headerRaw[i];
            byteStats[i][val] = (byteStats[i][val] || 0) + 1;
        }
    });

    console.log('\nByte Distribution:');
    byteStats.forEach((stat, i) => {
        const entries = Object.entries(stat).sort((a,b) => b[1] - a[1]).slice(0, 3);
        if (entries.length > 0)
            console.log(`Byte ${i}: ${JSON.stringify(entries)}`);
    });

    console.log('\nSamples:');
    records.slice(0, 15).forEach((r, i) => {
        // Try to split data by 00 00
        let pinyin = "";
        let text = "";
        const data = r.data;
        let nullPos = -1;
        for(let j=0; j<data.length-1; j+=2) {
            if (data[j] === 0 && data[j+1] === 0) {
                nullPos = j;
                break;
            }
        }
        if (nullPos !== -1) {
            pinyin = data.slice(0, nullPos).toString('utf16le');
            text = data.slice(nullPos + 2).toString('utf16le');
        }

        console.log(`${i+1}. Header: ${r.header} | Pinyin: ${pinyin} | Text: ${text}`);
    });
}

analyze();
