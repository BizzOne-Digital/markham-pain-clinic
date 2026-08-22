export default function FormField({ label, type = 'text', name, value, onChange, textarea, select, options, required, placeholder }) {
  return (
    <div>
      <label className="admin-label" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={5}
          placeholder={placeholder}
          className="admin-input resize-none"
          required={required}
        />
      ) : select ? (
        <select id={name} name={name} value={value} onChange={onChange} className="admin-input" required={required}>
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="admin-input"
          required={required}
        />
      )}
    </div>
  )
}
