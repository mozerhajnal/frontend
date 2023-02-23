function SelectField({ id, label, name, options = [], value = '', onChange }) {
  return (
    <div className="form-group mt-3 mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        className="form-select"
        name={name}
        onChange={onChange}
        id={id}
        value={value}
      >
        {options.map((item) => {
          return (
            <option key={item} value={item}>
              {item === 0 ? 'Choose!' : item}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectField;
