import "./Input.scss";

const Input = ({
  label,
  fields,
  onChange,
  classGroup,
  classInput,
  classLabel,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={fields.id}>{label}</label>
      <input
        type="text"
        className="form-control"
        {...fields}
        onChange={onChange}
      />
    </div>
  );
};

export const Checkbox = ({ label, fields, onChange }) => {
  return (
    <label htmlFor={fields.id} className="custom-checkbox">
      <input type="checkbox" {...fields} hidden onChange={onChange} />
      <span className="checkbox-text">{label}</span>
    </label>
  );
};

export default Input;
