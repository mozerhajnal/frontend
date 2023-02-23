import Icon from './Icon';

export default function InputField({
  type,
  name,
  id,
  value = '',
  placeholder,
  onChange,
  iconClass,
  autoComplete = 'on',
  label
}) {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label">
				{label}
			</label>
      <div className="input-group">
      <div className="input-group-text">
        <Icon className={iconClass} />
      </div>
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
    </div>
  );
}
