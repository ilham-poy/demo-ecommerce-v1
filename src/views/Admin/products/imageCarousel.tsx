// 'use client';

// type Props = {
//     sku: string;
//     images: string[];
//     index: number;
//     onNavigate: (direction: 'next' | 'prev') => void;
// };

// export default function ImageCarousel({ sku, images, index, onNavigate }: Props) {
//     const src = images[index] ?? '/no-image.png';

//     return (
//         <div style={{ position: 'relative' }}>
//             <img
//                 src={src}
//                 alt={`Image for ${sku}`}
//                 style={{ width: '100%', cursor: 'pointer' }}
//                 onClick={() => onNavigate('next')}
//                 onContextMenu={(e) => {
//                     e.preventDefault();
//                     onNavigate('prev');
//                 }}
//             />
//             <div style={{ position: 'absolute', bottom: 4, right: 8, fontSize: 12, color: '#fff' }}>
//                 {index + 1} / {images.length}
//             </div>
//         </div>
//     );
// }
