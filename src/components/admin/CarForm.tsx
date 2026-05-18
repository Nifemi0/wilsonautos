'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUploader from '@/components/admin/ImageUploader'
import { DbCarInsert } from '@/lib/database.types'

const MAKES = ['Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Hyundai', 'Ford', 'Chevrolet', 'Kia', 'Nissan', 'Volkswagen', 'Audi', 'Other']
const BODY_TYPES = ['sedan', 'suv', 'pickup', 'hatchback', 'bus', 'coupe']
const CONDITIONS = [{ value: 'tokunbo', label: 'Tokunbo (Foreign Used)' }, { value: 'nigerian-used', label: 'Nigerian Used' }]
const TRANSMISSIONS = ['automatic', 'manual']
const FUELS = ['petrol', 'diesel']

type StepData = Partial<DbCarInsert>
interface UploadedImage { url: string; publicId: string; isPrimary: boolean }

const STEPS = ['Basic Info', 'Details', 'Photos', 'Review']

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-bold flex-shrink-0 transition-all ${i < current ? 'bg-emerald-500 text-white' : i === current ? 'bg-[#F59E0B] text-[#1E2030]' : 'bg-gray-200 text-gray-400'}`}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`text-xs font-body ml-2 hidden sm:block ${i === current ? 'text-[#1E2030] font-semibold' : 'text-gray-400'}`}>{label}</span>
          {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${i < current ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-body text-sm font-medium text-[#1E2030] mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const INPUT = "w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors bg-white"
const SELECT = "w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#F59E0B] transition-colors bg-white"

export interface CarFormProps {
  initialData?: DbCarInsert
  initialImages?: UploadedImage[]
  carId?: string
  mode?: 'create' | 'edit'
}

export default function CarForm({ initialData, initialImages = [], carId, mode = 'create' }: CarFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<StepData>(initialData ?? {
    make: '', model: '', year: new Date().getFullYear(), price: 0, condition: 'tokunbo',
    location: '', whatsapp_number: '', status: 'available', featured: false,
    mileage: undefined, transmission: 'automatic', fuel_type: 'petrol',
    body_type: 'sedan', colour: '', description: '',
  })
  const [images, setImages] = useState<UploadedImage[]>(initialImages)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = useCallback((key: keyof StepData, value: unknown) => {
    setData(prev => ({ ...prev, [key]: value }))
  }, [])

  const validate = () => {
    if (step === 0) {
      if (!data.make || !data.model || !data.year || !data.price || !data.condition || !data.location || !data.whatsapp_number) {
        setError('Please fill in all required fields.')
        return false
      }
    }
    setError('')
    return true
  }

  const handleNext = () => {
    if (validate()) setStep(s => s + 1)
  }

  const handleSave = async (status: 'available' | 'draft') => {
    setSaving(true)
    setError('')
    try {
      const supabase = createClient()
      const carData: DbCarInsert = { ...data as DbCarInsert, status }

      if (mode === 'edit' && carId) {
        const { error } = await (supabase.from('cars') as any).update(carData).eq('id', carId)
        if (error) throw error

        // Handle images: delete removed ones, insert new ones
        const existing = initialImages.map(i => i.url)
        const current = images.map(i => i.url)
        const removed = existing.filter(u => !current.includes(u))
        const added = images.filter(i => !existing.includes(i.url))

        if (removed.length) {
          await (supabase.from('car_images') as any).delete().in('image_url', removed)
        }
        if (added.length) {
          await (supabase.from('car_images') as any).insert(added.map(i => ({ car_id: carId, image_url: i.url, is_primary: i.isPrimary })))
        }
        // Update primary flags
        for (const img of images) {
          await (supabase.from('car_images') as any).update({ is_primary: img.isPrimary }).eq('image_url', img.url)
        }
      } else {
        const { data: car, error: carErr } = await (supabase.from('cars') as any).insert(carData).select().single()
        if (carErr) throw carErr

        if (images.length) {
          const { error: imgErr } = await (supabase.from('car_images') as any).insert(
            images.map(i => ({ car_id: car.id, image_url: i.url, is_primary: i.isPrimary }))
          )
          if (imgErr) throw imgErr
        }
      }

      router.push('/admin/cars')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-[#1E2030] text-3xl">{mode === 'edit' ? 'Edit Car' : 'Add New Car'}</h1>
          <p className="font-body text-gray-400 text-sm mt-1">Step {step + 1} of {STEPS.length}</p>
        </div>
      </div>

      <StepIndicator current={step} />

      {error && <div className="bg-red-50 border border-red-200 text-red-700 font-body text-sm px-4 py-3 rounded-xl mb-5">{error}</div>}

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        {/* Step 0: Basic Info */}
        {step === 0 && (
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Make" required>
              <select value={data.make || ''} onChange={e => set('make', e.target.value)} className={SELECT} id="form-make">
                <option value="">Select Make</option>
                {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
            <Field label="Model" required>
              <input id="form-model" type="text" value={data.model || ''} onChange={e => set('model', e.target.value)} placeholder="e.g. Camry" className={INPUT} />
            </Field>
            <Field label="Year" required>
              <input id="form-year" type="number" value={data.year || ''} onChange={e => set('year', Number(e.target.value))} placeholder="2020" className={INPUT} min={1990} max={2026} />
            </Field>
            <Field label="Price (₦)" required>
              <input id="form-price" type="number" value={data.price || ''} onChange={e => set('price', Number(e.target.value))} placeholder="15000000" className={INPUT} />
            </Field>
            <Field label="Condition" required>
              <select value={data.condition || ''} onChange={e => set('condition', e.target.value)} className={SELECT} id="form-condition">
                {CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Location" required>
              <input id="form-location" type="text" value={data.location || ''} onChange={e => set('location', e.target.value)} placeholder="Lagos" className={INPUT} />
            </Field>
            <Field label="WhatsApp Number" required>
              <input id="form-whatsapp" type="tel" value={data.whatsapp_number || ''} onChange={e => set('whatsapp_number', e.target.value)} placeholder="+2348000000000" className={INPUT} />
            </Field>
            <div className="flex items-center gap-3 pt-4">
              <input type="checkbox" id="form-featured" checked={!!data.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 accent-[#F59E0B]" />
              <label htmlFor="form-featured" className="font-body text-sm text-[#1E2030] font-medium cursor-pointer">Mark as Featured</label>
            </div>
          </div>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Mileage (km)">
              <input id="form-mileage" type="number" value={data.mileage ?? ''} onChange={e => set('mileage', e.target.value ? Number(e.target.value) : null)} placeholder="50000" className={INPUT} />
            </Field>
            <Field label="Transmission">
              <select value={data.transmission || ''} onChange={e => set('transmission', e.target.value)} className={SELECT} id="form-transmission">
                {TRANSMISSIONS.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Fuel Type">
              <select value={data.fuel_type || ''} onChange={e => set('fuel_type', e.target.value)} className={SELECT} id="form-fuel">
                {FUELS.map(f => <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Body Type">
              <select value={data.body_type || ''} onChange={e => set('body_type', e.target.value)} className={SELECT} id="form-bodytype">
                {BODY_TYPES.map(b => <option key={b} value={b}>{b.charAt(0).toUpperCase() + b.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Colour">
              <input id="form-colour" type="text" value={data.colour || ''} onChange={e => set('colour', e.target.value)} placeholder="e.g. Midnight Black" className={INPUT} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <textarea
                  id="form-description"
                  rows={5}
                  value={data.description || ''}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Describe the car's condition, features, and highlights..."
                  className={`${INPUT} resize-none`}
                />
              </Field>
            </div>
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <div>
            <p className="font-body text-gray-500 text-sm mb-5">Upload up to 10 photos. Hover over an image to set it as primary or remove it.</p>
            <ImageUploader
              initialImages={images}
              onChange={setImages}
              maxImages={10}
            />
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ['Make', data.make], ['Model', data.model], ['Year', data.year],
                ['Price', data.price ? '₦' + Number(data.price).toLocaleString() : '-'],
                ['Condition', data.condition], ['Location', data.location],
                ['WhatsApp', data.whatsapp_number], ['Transmission', data.transmission],
                ['Fuel', data.fuel_type], ['Body Type', data.body_type],
                ['Colour', data.colour], ['Mileage', data.mileage ? data.mileage + ' km' : '-'],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between py-2 border-b border-gray-50">
                  <span className="font-body text-gray-400 text-sm">{k}</span>
                  <span className="font-body font-semibold text-[#1E2030] text-sm">{String(v) || '—'}</span>
                </div>
              ))}
            </div>
            {data.description && (
              <div>
                <p className="font-body text-xs text-gray-400 mb-1">Description</p>
                <p className="font-body text-gray-600 text-sm">{data.description}</p>
              </div>
            )}
            <div>
              <p className="font-body text-xs text-gray-400 mb-2">Photos ({images.length})</p>
              <p className={`font-body text-sm ${images.length === 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {images.length === 0 ? '⚠ No photos uploaded — recommended to add at least 1 photo.' : `✓ ${images.length} photo${images.length !== 1 ? 's' : ''} uploaded`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {step > 0 ? (
          <button onClick={() => setStep(s => s - 1)} className="border border-gray-200 text-gray-600 font-body font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            ← Back
          </button>
        ) : (
          <button onClick={() => router.push('/admin/cars')} className="border border-gray-200 text-gray-600 font-body font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            Cancel
          </button>
        )}

        <div className="flex gap-3">
          {step === STEPS.length - 1 ? (
            <>
              <button
                id="save-draft-btn"
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="border border-gray-200 text-gray-600 font-body font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save as Draft'}
              </button>
              <button
                id="publish-btn"
                onClick={() => handleSave('available')}
                disabled={saving}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-[#1E2030] font-display font-bold px-6 py-2.5 rounded-xl transition-colors text-sm disabled:opacity-50"
              >
                {saving ? 'Publishing…' : mode === 'edit' ? 'Save Changes' : 'Publish Car'}
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className="bg-[#1E2030] hover:bg-[#2a2d45] text-white font-display font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
