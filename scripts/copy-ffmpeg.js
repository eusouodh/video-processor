import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyFFmpegFiles() {
  const ffmpegCorePath = path.resolve(__dirname, '../node_modules/@ffmpeg/core');
  const publicPath = path.resolve(__dirname, '../public');

  try {
    // Ensure public directory exists
    await fs.mkdir(publicPath, { recursive: true });

    // Copy core files from the correct location
    await fs.copyFile(
      path.join(ffmpegCorePath, 'dist', 'ffmpeg-core.js'),
      path.join(publicPath, 'ffmpeg-core.js')
    );
    await fs.copyFile(
      path.join(ffmpegCorePath, 'dist', 'ffmpeg-core.wasm'),
      path.join(publicPath, 'ffmpeg-core.wasm')
    );

    console.log('FFmpeg core files copied successfully');
  } catch (error) {
    console.error('Error copying FFmpeg files:', error);
    process.exit(1);
  }
}

copyFFmpegFiles();