import { useRef, useState } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'

export default function ImageUploader({ label = 'Image', value, onChange }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(typeof value === 'string' ? value : '')

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onChange(file)
  }

  function clear() {
    setPreview('')
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <span className="admin-label">{label}</span>
      <div className="flex items-start gap-4">
        <div className="w-28 h-28 rounded-lg border border-dashed border-beige bg-ivory flex items-center justify-center overflow-hidden relative">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <FiUpload className="text-textSecondary text-xl" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="admin-btn-primary cursor-pointer !py-2 !px-4 text-xs">
            <FiUpload /> Choose File
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
          {preview && (
            <button type="button" onClick={clear} className="text-xs text-red-500 flex items-center gap-1">
              <FiX /> Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
