const Select = ({
  label,
  fields,
  onChange,
  classGroup,
  classInput,
  classLabel,
  children,
  disabled,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={fields.id}>{label}</label>
      <select
        className="form-control"
        {...fields}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </select>
    </div>
  );
};
export default Select;
