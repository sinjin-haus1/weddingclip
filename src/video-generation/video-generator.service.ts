import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { TtsService } from './tts.service';
import { TemplateStyle } from '../videos/video.schema';

// Wedding-style color palettes for each template
const TEMPLATE_PALETTES: Record<TemplateStyle, { background: string; text: string; accent: string; font: string }> = {
  [TemplateStyle.ELEGANT]: {
    background: '#1a1a2e', // Deep navy
    text: '#f8f8f2',       // Warm white
    accent: '#c9a962',      // Gold
    font: 'Georgia',        // Serif font for elegance
  },
  [TemplateStyle.RUSTIC]: {
    background: '#3d2b1f', // Dark brown
    text: '#f5f0e8',       // Cream
    accent: '#8b6914',      // Antique gold
    font: 'Georgia',        // Classic serif
  },
  [TemplateStyle.MODERN]: {
    background: '#0f0f23', // Near black
    text: '#ffffff',       // Pure white
    accent: '#e056fd',      // Vibrant pink
    font: 'Arial',         // Clean sans-serif
  },
  [TemplateStyle.CLASSIC]: {
    background: '#1a1a2e', // Navy
    text: '#f8f8f2',        // Warm white
    accent: '#c9a962',      // Gold
    font: 'Times New Roman', // Traditional serif
  },
  [TemplateStyle.FLORAL]: {
    background: '#2d1f3d', // Deep purple
    text: '#fff0f5',        // Lavender blush
    accent: '#ff69b4',      // Hot pink
    font: 'Georgia',        // Elegant serif
  },
};

export interface VideoGenerationInput {
  videoId: string;
  reviewText: string;
  reviewerName: string;
  rating: number;
  vendorName: string;
  vendorLogoUrl?: string;
  templateStyle: TemplateStyle;
  duration: number; // target duration in seconds
  ttsAudioUrl?: string; // optional pre-generated TTS
}

export interface VideoGenerationOutput {
  outputUrl: string;
  duration: number;
  thumbnailUrl?: string;
}

@Injectable()
export class VideoGeneratorService {
  private ffmpegPath: string;
  private fluentFfmpeg: typeof import('fluent-ffmpeg');

  constructor(
    private ttsService: TtsService,
    private configService: ConfigService,
  ) {
    this.initializeFfmpeg();
  }

  private initializeFfmpeg() {
    try {
      this.ffmpegPath = require('ffmpeg-static');
      this.fluentFfmpeg = require('fluent-ffmpeg');
      this.fluentFfmpeg.setFfmpegPath(this.ffmpegPath);
    } catch (e) {
      console.warn('FFmpeg not available, using placeholder generation');
    }
  }

  /**
   * Generate a wedding-style video from a review
   */
  async generateVideo(input: VideoGenerationInput): Promise<VideoGenerationOutput> {
    const outputDir = join(process.cwd(), 'uploads', 'processed');
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    const outputFile = join(outputDir, `video_${input.videoId}.mp4`);
    const palette = TEMPLATE_PALETTES[input.templateStyle] || TEMPLATE_PALETTES[TemplateStyle.ELEGANT];

    // Generate TTS audio if not provided
    let ttsAudioUrl = input.ttsAudioUrl;
    let audioDuration = input.duration;

    if (!ttsAudioUrl && this.ttsService) {
      try {
        const ttsResult = await this.ttsService.generateSpeech({
          text: input.reviewText,
          voiceId: this.getVoiceIdForTemplate(input.templateStyle),
        });
        ttsAudioUrl = ttsResult.audioUrl;
        audioDuration = ttsResult.duration || input.duration;
      } catch (e) {
        console.warn('TTS generation failed, proceeding without audio:', e);
      }
    }

    // Build the FFmpeg command
    if (this.fluentFfmpeg && this.ffmpegPath) {
      return this.generateWithFfmpeg(input, outputFile, palette, ttsAudioUrl, audioDuration);
    } else {
      // Fallback: create a placeholder file
      return this.createPlaceholderVideo(input, outputFile, palette);
    }
  }

  private async generateWithFfmpeg(
    input: VideoGenerationInput,
    outputFile: string,
    palette: { background: string; text: string; accent: string; font: string },
    ttsAudioUrl?: string,
    audioDuration?: number,
  ): Promise<VideoGenerationOutput> {
    const duration = audioDuration || input.duration;
    const trimmedText = this.trimTextForDuration(input.reviewText, duration);

    return new Promise((resolve, reject) => {
      let command = this.fluentFfmpeg();

      // Create background with gradient
      command = command
        .input(`color=c=${palette.background.replace('#', '0x')}:s=1080x1920:d=${duration}:r=30`)
        .inputFormat('lavfi');

      // If TTS audio is available, use it as input
      if (ttsAudioUrl && ttsAudioUrl.startsWith('file://')) {
        command = command.input(ttsAudioUrl.replace('file://', ''));
      }

      // Build filter complex for text overlay
      const textFilter = this.buildTextFilter(trimmedText, input, palette, duration);
      const overlayFilter = this.buildOverlayFilter(input, palette);

      const outputOptions = [
        '-map 0:v', // Map background
        ...(ttsAudioUrl ? ['-map 1:a'] : []), // Map audio if available
        ...(ttsAudioUrl
          ? []
          : ['-an']), // No audio if no TTS
        '-vf', textFilter,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '23',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-shortest', // End when shortest input ends
      ];

      if (overlayFilter) {
        outputOptions.push('-lavfi', overlayFilter);
      }

      command
        .outputOptions(outputOptions)
        .output(outputFile)
        .on('end', () => {
          resolve({
            outputUrl: `file://${outputFile}`,
            duration,
            thumbnailUrl: `file://${outputFile.replace('.mp4', '_thumb.jpg')}`,
          });
        })
        .on('error', (err: Error) => {
          console.error('FFmpeg error:', err.message);
          // On error, create a minimal placeholder
          this.createPlaceholderVideo(input, outputFile, palette)
            .then(resolve)
            .catch(reject);
        })
        .run();
    });
  }

  private buildTextFilter(
    text: string,
    input: VideoGenerationInput,
    palette: { background: string; text: string; accent: string; font: string },
    duration: number,
  ): string {
    const lines = this.wrapText(text, 40);
    const lineHeight = 60;
    const totalTextHeight = lines.length * lineHeight;
    const startY = (1920 - totalTextHeight) / 2 - 100;

    // Build drawtext filter for each line
    const textFilters = lines.map((line, i) => {
      const y = startY + i * lineHeight;
      return `drawtext=text='${this.escapeFfmpegText(line)}':fontsize=56:fontcolor=${palette.text.replace('#', '0x')}:x=(w-text_w)/2:y=${y}:fontfile=/System/Library/Fonts/Supplemental/Georgia Bold.ttf:enable='between(t,0,${duration})'`;
    });

    // Add reviewer attribution
    const attributionY = startY + lines.length * lineHeight + 80;
    const attributionText = `— ${input.reviewerName}`;
    textFilters.push(
      `drawtext=text='${this.escapeFfmpegText(attributionText)}':fontsize=36:fontcolor=${palette.accent.replace('#', '0x')}:x=(w-text_w)/2:y=${attributionY}:fontfile=/System/Library/Fonts/Supplemental/Georgia Italic.ttf:enable='between(t,0,${duration})'`,
    );

    // Add star rating
    const stars = '★'.repeat(input.rating) + '☆'.repeat(5 - input.rating);
    const starsY = attributionY + 60;
    textFilters.push(
      `drawtext=text='${stars}':fontsize=40:fontcolor=${palette.accent.replace('#', '0x')}:x=(w-text_w)/2:y=${starsY}:fontfile=/System/Library/Fonts/Supplemental/Georgia.ttf:enable='between(t,0,${duration})'`,
    );

    // Add vendor name
    const vendorY = 1920 - 200;
    textFilters.push(
      `drawtext=text='${this.escapeFfmpegText(input.vendorName)}':fontsize=32:fontcolor=${palette.accent.replace('#', '0x')}:x=(w-text_w)/2:y=${vendorY}:fontfile=/System/Library/Fonts/Supplemental/Georgia.ttf:enable='between(t,0,${duration})'`,
    );

    return textFilters.join(',');
  }

  private buildOverlayFilter(
    input: VideoGenerationInput,
    palette: { accent: string },
  ): string | null {
    // Add a decorative line or watermark if needed
    // This could add a vendor logo or decorative element
    if (!input.vendorLogoUrl) {
      // Add a simple decorative line
      return `drawbox=x=0:y=100:w=1080:h=5:color=${palette.accent.replace('#', '0x')}@0.6:enable='between(t,0,${input.duration})'`;
    }
    return null;
  }

  private async createPlaceholderVideo(
    input: VideoGenerationInput,
    outputFile: string,
    palette: { background: string; text: string; accent: string },
  ): Promise<VideoGenerationOutput> {
    // Create a simple HTML placeholder that can be rendered
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; background: ${palette.background}; color: ${palette.text}; font-family: Georgia, serif; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; box-sizing: border-box; }
  .stars { color: ${palette.accent}; font-size: 48px; margin-bottom: 30px; }
  .review { font-size: 32px; line-height: 1.6; max-width: 800px; margin-bottom: 40px; }
  .author { color: ${palette.accent}; font-size: 24px; font-style: italic; margin-bottom: 20px; }
  .vendor { color: ${palette.accent}; font-size: 20px; opacity: 0.8; }
</style>
</head>
<body>
  <div class="stars">${'★'.repeat(input.rating)}${'☆'.repeat(5 - input.rating)}</div>
  <div class="review">"${this.escapeHtml(input.reviewText)}"</div>
  <div class="author">— ${this.escapeHtml(input.reviewerName)}</div>
  <div class="vendor">${this.escapeHtml(input.vendorName)}</div>
</body>
</html>`;

    // Save HTML placeholder
    const htmlFile = outputFile.replace('.mp4', '.html');
    await writeFile(htmlFile, htmlContent);

    return {
      outputUrl: `file://${htmlFile}`,
      duration: input.duration,
    };
  }

  private trimTextForDuration(text: string, durationSeconds: number): string {
    // Roughly 2.5 words per second for TTS
    const maxWords = Math.floor(durationSeconds * 2.5);
    const words = text.split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(' ') + '...';
  }

  private wrapText(text: string, maxCharsPerLine: number): string[] {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    return lines.slice(0, 8); // Max 8 lines
  }

  private escapeFfmpegText(text: string): string {
    // Escape special characters for FFmpeg drawtext filter
    return text.replace(/'/g, "'\\''").replace(/:/g, '\\:').replace(/\n/g, ' ');
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private getVoiceIdForTemplate(style: TemplateStyle): string {
    const voiceIds: Record<TemplateStyle, string> = {
      [TemplateStyle.ELEGANT]: 'pFZP5JQG7iQjIQuC4Bku',
      [TemplateStyle.RUSTIC]: 'TX3LPaxmHKxFdv7VOQHJ',
      [TemplateStyle.MODERN]: 'EXAVITQu4vr4xnSDxMaL',
      [TemplateStyle.CLASSIC]: 'VR6AewLTigWG4xSOukaG',
      [TemplateStyle.FLORAL]: 'o0tBDefyDptVxlMRXBSn',
    };
    return voiceIds[style] || voiceIds[TemplateStyle.ELEGANT];
  }
}
