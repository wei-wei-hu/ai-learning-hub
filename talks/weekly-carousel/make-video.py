#!/usr/bin/env python3
"""Turn a rendered weekly carousel folder into silent videos (no audio track).

Usage: python3 make-video.py <week folder>
Needs: ffmpeg and pillow + numpy.
Writes video-9x16.mp4 (Reels/Shorts/TikTok) and video-1x1.mp4 (LinkedIn/feed):
each slide gets a slow push-in, with soft crossfades between slides.
"""
import glob, os, re, subprocess, sys, tempfile
import numpy as np
from PIL import Image

week = sys.argv[1]
slides = sorted(glob.glob(os.path.join(week, 'slide-*.png')), key=lambda p: int(re.findall(r'(\d+)', os.path.basename(p))[0]))
n = len(slides)
# reading time per slide: cover 3.5s, talk slides 5s, recap and call-to-action 4.5s
durs = [3.5] + [5.0] * (n - 3) + [4.5, 4.5] if n >= 3 else [4.0] * n
FADE, FPS = 0.5, 30
tmp = tempfile.mkdtemp()

def bg(w, h):
    a, b, c = np.array([0xF6,0xF0,0xE4]), np.array([0xF0,0xEA,0xEE]), np.array([0xE4,0xDD,0xF4])
    y, x = np.mgrid[0:h, 0:w]; t = ((x / w + y / h) / 2)[..., None]
    img = np.where(t < .45, a + (b - a) * (t / .45), b + (c - b) * ((t - .45) / .55))
    p = os.path.join(tmp, f'bg{w}x{h}.png'); Image.fromarray(img.astype('uint8')).save(p); return p

def build(W, H, name):
    sw, sh = (1080, 1350) if H > W else (864, 1080)
    back = bg(W, H); clips = []
    for i, s in enumerate(slides):
        D = durs[i]; out = os.path.join(tmp, f'{name}-c{i}.mp4')
        vf = (f"[1:v]scale={sw*2}:{sh*2},zoompan=z='1+0.025*on/({D}*{FPS})':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
              f":d={int(D*FPS)}:s={sw}x{sh}:fps={FPS}[sl];[0:v][sl]overlay=(W-w)/2:(H-h)/2,format=yuv420p")
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-loop', '1', '-t', str(D), '-i', back, '-i', s,
                        '-filter_complex', vf, '-t', str(D), '-r', str(FPS), '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', out], check=True)
        clips.append(out)
    inputs, fc, prev, t0 = [], [], '0:v', 0.0
    for c in clips: inputs += ['-i', c]
    for i in range(1, n):
        t0 += durs[i-1] - FADE
        fc.append(f'[{prev}][{i}:v]xfade=transition=fade:duration={FADE}:offset={t0:.3f}[v{i}]'); prev = f'v{i}'
    outp = os.path.join(week, f'video-{name}.mp4')
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', *inputs]
    if fc: cmd += ['-filter_complex', ';'.join(fc), '-map', f'[{prev}]']
    subprocess.run(cmd + ['-an', '-c:v', 'libx264', '-crf', '19', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outp], check=True)
    print(f'{outp}  {sum(durs) - FADE * (n - 1):.1f}s, no audio')

build(1080, 1920, '9x16')
build(1080, 1080, '1x1')
