'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface UploadedImage {
  url: string
  publicId: string
  isPrimary: boolean
}

interface ImageUploaderProps {
  initialImages?: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
  maxImages?: number
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

async function uploadToCloudinary(file: File): Promise<{ url: string; publicId: string }> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) throw new Error('Cloudinary not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local')

  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET)
  form.append('folder', 'wilson-express-autos')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: form,
  })
  if (!res.ok) throw new Error('Upload failed')
  const data = await res.json()
  return { url: data.secure_url, publicId: data.public_id }
}

interface UploadProgress {
  file: string
  percent: number
  error?: string
}

export default function ImageUploader({ initialImages = [], onChange, maxImages = 10 }: ImageUploaderProps) {
  const [images, setImages] = useState<UploadedImage[]>(initialImages)
  const [uploading, setUploading] = useState<UploadProgress[]>([])
  const [dragging, setDragging] = useState(false)

  const updateAndNotify = useCallback((next: UploadedImage[]) => {
    setImages(next)
    onChange(next)
  }, [onChange])

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return
    const allowed = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, maxImages - images.length)
    if (!allowed.length) return

    setUploading(allowed.map(f => ({ file: f.name, percent: 0 })))

    const results: UploadedImage[] = []
    for (let i = 0; i < allowed.length; i++) {
      const file = allowed[i]
      try {
        setUploading(prev => prev.map((u, idx) => idx === i ? { ...u, percent: 30 } : u))
        const { url, publicId } = await uploadToCloudinary(file)
        setUploading(prev => prev.map((u, idx) => idx === i ? { ...u, percent: 100 } : u))
        results.push({ url, publicId, isPrimary: images.length === 0 && i === 0 })
      } catch (err) {
        setUploading(prev => prev.map((u, idx) => idx === i ? { ...u, error: 'Failed' } : u))
      }
    }

    setTimeout(() => setUploading([]), 800)
    updateAndNotify([...images, ...results])
  }, [images, maxImages, updateAndNotify])

  const removeImage = useCallback((idx: number) => {
    const next = images.filter((_, i) => i !== idx)
    if (next.length && !next.some(img => img.isPrimary)) next[0].isPrimary = true
    updateAndNotify(next)
  }, [images, updateAndNotify])

  const setPrimary = useCallback((idx: number) => {
    updateAndNotify(images.map((img, i) => ({ ...img, isPrimary: i === idx })))
  }, [images, updateAndNotify])

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      {images.length < maxImages && (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${dragging ? 'border-[#F59E0B] bg-[#F59E0B]/5' : 'border-gray-200 hover:border-[#F59E0B]/50'}`}
        >
          <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" className="w-6 h-6">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <p className="font-body text-sm text-gray-500 mb-2">
            Drag & drop images here, or{' '}
            <label className="text-[#F59E0B] font-semibold cursor-pointer hover:underline">
              browse
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={e => handleFiles(e.target.files)}
                id="image-upload-input"
              />
            </label>
          </p>
          <p className="font-body text-xs text-gray-400">Up to {maxImages} images · JPG, PNG, WebP</p>
        </div>
      )}

      {/* Upload progress */}
      {uploading.length > 0 && (
        <div className="space-y-2">
          {uploading.map((u, i) => (
            <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-body text-xs text-gray-600 truncate">{u.file}</p>
                <p className="font-body text-xs text-gray-400">{u.error || `${u.percent}%`}</p>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${u.error ? 'bg-red-400' : 'bg-[#F59E0B]'}`}
                  style={{ width: `${u.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <div key={img.url} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
              <Image src={img.url} alt={`Upload ${idx + 1}`} fill className="object-cover" sizes="120px" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPrimary(idx)}
                  title="Set as primary"
                  className="w-7 h-7 bg-[#F59E0B] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1E2030" strokeWidth="2.5" className="w-3.5 h-3.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  title="Remove"
                  className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" className="w-3 h-3">
                    <line x1="2" y1="2" x2="8" y2="8"/><line x1="8" y1="2" x2="2" y2="8"/>
                  </svg>
                </button>
              </div>
              {/* Primary badge */}
              {img.isPrimary && (
                <div className="absolute top-1.5 left-1.5 bg-[#F59E0B] text-[#1E2030] text-[10px] font-bold px-1.5 py-0.5 rounded font-body">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="font-body text-xs text-gray-400">
        {images.length}/{maxImages} images uploaded. Star = set as primary photo.
      </p>
    </div>
  )
}
