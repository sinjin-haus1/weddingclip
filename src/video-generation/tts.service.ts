import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

export interface TtsOptions {
  text: string;
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
  speed?: number;
}

export interface TtsResult {
  audioUrl: string;
  duration: number; // seconds
}

@Injectable()
export class TtsService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.elevenlabs.io/v1';

  // Default voice IDs for wedding videos (professional, warm voices)
  private readonly defaultVoices = {
    ELEGANT: 'pFZP5JQG7iQjIQuC4Bku', // Female, warm, professional
    RUSTIC: 'TX3LPaxmHKxFdv7VOQHJ', // Male, friendly, warm
    MODERN: 'EXAVITQu4vr4xnSDxMaL', // Female, clear, modern
    CLASSIC: 'VR6AewLTigWG4xSOukaG', // Male, deep, classic
    FLORAL: 'o0tBDefyDptVxlMRXBSn', // Female, soft, romantic
  };

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ELEVENLABS_API_KEY', '');
  }

  /**
   * Generate TTS audio from text using ElevenLabs
   */
  async generateSpeech(options: TtsOptions): Promise<TtsResult> {
    if (!this.apiKey) {
      console.warn('ElevenLabs API key not configured, using placeholder audio');
      return this.getPlaceholderAudio(options.text);
    }

    const voiceId = options.voiceId || this.defaultVoices.ELEGANT;
    const stability = options.stability ?? 0.5;
    const similarityBoost = options.similarityBoost ?? 0.75;
    const speed = options.speed ?? 0.95;

    try {
      const response = await axios.post(
        `${this.baseUrl}/text-to-speech/${voiceId}`,
        {
          text: options.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability,
            similarity_boost: similarityBoost,
            style: 0.2,
            use_speaker_boost: true,
            speed,
          },
        },
        {
          headers: {
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
          },
          responseType: 'arraybuffer',
        },
      );

      // Save audio to temp file
      const outputDir = join(process.cwd(), 'uploads', 'tts');
      const filename = `tts_${Date.now()}.mp3`;
      const filepath = join(outputDir, filename);

      await writeFile(filepath, Buffer.from(response.data));

      // Get duration from response headers or estimate
      const contentLength = parseInt(response.headers['content-length'] as string, 10) || 0;
      // Estimate: ~10KB per second for mp3 at 128kbps
      const estimatedDuration = Math.ceil((contentLength / 10240) * 8);

      return {
        audioUrl: `file://${filepath}`,
        duration: estimatedDuration || 10,
      };
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      return this.getPlaceholderAudio(options.text);
    }
  }

  /**
   * Clean up TTS audio file after use
   */
  async cleanupAudio(audioUrl: string): Promise<void> {
    if (audioUrl.startsWith('file://')) {
      const filepath = audioUrl.replace('file://', '');
      try {
        await unlink(filepath);
      } catch {
        // Ignore cleanup errors
      }
    }
  }

  /**
   * Get available voices from ElevenLabs
   */
  async getAvailableVoices(): Promise<{ id: string; name: string; gender: string }[]> {
    if (!this.apiKey) {
      return Object.entries(this.defaultVoices).map(([style, id]) => ({
        id,
        name: `${style} voice`,
        gender: style === 'RUSTIC' || style === 'CLASSIC' ? 'male' : 'female',
      }));
    }

    try {
      const response = await axios.get(`${this.baseUrl}/voices`, {
        headers: { 'xi-api-key': this.apiKey },
      });

      return (response.data.voices || []).map((v: { voice_id: string; name: string; labels?: { gender?: string } }) => ({
        id: v.voice_id,
        name: v.name,
        gender: v.labels?.gender || 'unknown',
      }));
    } catch {
      return Object.entries(this.defaultVoices).map(([style, id]) => ({
        id,
        name: `${style} voice`,
        gender: style === 'RUSTIC' || style === 'CLASSIC' ? 'male' : 'female',
      }));
    }
  }

  private async getPlaceholderAudio(text: string): Promise<TtsResult> {
    // Return a silent placeholder for development without API key
    const duration = Math.min(Math.ceil(text.split(' ').length / 2.5), 30);
    return {
      audioUrl: '',
      duration,
    };
  }
}
