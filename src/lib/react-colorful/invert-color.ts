// // Hàm lấy màu đối nghịch (complementary color)
// export const getComplementaryColor = (hex: string) => {
//     // Chuyển từ HEX sang RGB
//     const r = parseInt(hex.substring(1, 3), 16);
//     const g = parseInt(hex.substring(3, 5), 16);
//     const b = parseInt(hex.substring(5, 7), 16);

//     // Chuyển RGB sang HSL
//     const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
//     const max = Math.max(rNorm, gNorm, bNorm);
//     const min = Math.min(rNorm, gNorm, bNorm);
//     let h = 0, s = 0, l = (max + min) / 2;

//     if (max !== min) {
//         const d = max - min;
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//         switch (max) {
//             case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
//             case gNorm: h = (bNorm - rNorm) / d + 2; break;
//             case bNorm: h = (rNorm - gNorm) / d + 4; break;
//         }
//         h *= 60;
//     }

//     // Lấy màu đối nghịch bằng cách cộng 180 độ
//     h = (h + 180) % 360;

//     // Chuyển HSL ngược lại thành RGB
//     const c = (1 - Math.abs(2 * l - 1)) * s;
//     const x = c * (1 - Math.abs((h / 60) % 2 - 1));
//     const m = l - c / 2;
//     let r1 = 0, g1 = 0, b1 = 0;

//     if (h < 60) [r1, g1, b1] = [c, x, 0];
//     else if (h < 120) [r1, g1, b1] = [x, c, 0];
//     else if (h < 180) [r1, g1, b1] = [0, c, x];
//     else if (h < 240) [r1, g1, b1] = [0, x, c];
//     else if (h < 300) [r1, g1, b1] = [x, 0, c];
//     else[r1, g1, b1] = [c, 0, x];

//     // Chuyển RGB về HEX
//     const compHex = `#${((r1 + m) * 255).toString(16).padStart(2, "0")}${((g1 + m) * 255).toString(16).padStart(2, "0")}${((b1 + m) * 255).toString(16).padStart(2, "0")}`;

//     return compHex.toUpperCase();
// };